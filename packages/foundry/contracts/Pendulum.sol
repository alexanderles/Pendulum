// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "./ERC721P.sol";
import "./interfaces/IPendulum.sol";

// TODO make sure what the difference between setApproval and setApprovalForAll is
contract Pendulum is ERC721P, IPendulum {
    // CONSTANT
    uint256 private constant _VERSION = 1;

    uint256 internal constant _FEE_DENOMINATOR = 100_00;

    uint256 internal constant _TAX_PERIOD = 7 days; // can make minimum 1 day

    uint256 internal constant _MAXIMUM_DURATION = 365 days;

    uint256 internal constant _MAXIMUM_PRICE = 2 ** 128;

    uint256 internal constant _AUCTION_BID_EXTENSION = 900;

    // Address variables
    address public factory;
    address public beneficiary; // TODO prolly don't need this
    address public leadingBidder;

    // Fee Variables
    uint256 public tax;
    uint256 public saleRoyalty;

    // Auction Parameters
    uint256 public auctionStartingPrice;
    uint256 public auctionMinBidStep;

    uint256 public auctionMinDuration;
    uint256 public auctionEndTime;

    uint256 public leadingBid;

    // Pendulum Parameters
    /// how often the Pendulum can be invoked.

    uint256 public responsePeriod;
    uint256 public lastSettlementTime;
    uint256 public lastInvocationTime;
    uint256 public questionFrequency;
    uint256 public ratingPeriod = 7 days; //TODO thinking this is a good val to have. Can make it default
    /// Fan receive time: when the Orb was last transferred, except to this contract.
    uint256 public fanReceiveTime;
    // need system to store rating
    uint256 public price;
    uint256 public questionTextLength; // TODO what's optimal char length? 280, 500?

    mapping(address => uint256) public fundsOf;

    /// Gap used to prevent storage collisions.
    uint256[50] private __gap;

    // This function will be called by parent class to initialize the ERC721
    function initialize(
        string memory name_,
        string memory symbol_,
        string memory tokenURI_,
        uint256 _auctionStartingPrice, //set default to 0
        uint256 _auctionMinBidStep, //set default to 0
        uint256 _auctionMinDuration, //set default to 1 days, acts as end time
        address _beneficiary,
        uint256 _validUntil,
        uint256 _questionFrequency,
        uint256 _tax,
        uint256 _saleRoyalty
    ) external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC721_init(name_, symbol_, tokenURI_, _validUntil);

        _tokenURI = tokenURI_;
        // Auction Parameters
        auctionStartingPrice = _auctionStartingPrice;
        auctionMinBidStep = _auctionMinBidStep;
        auctionMinDuration = _auctionMinDuration;
        // auctionKeeperMinimumDuration = 1 days; TODO same as auctionMinDuration

        questionFrequency = _questionFrequency;
        tax = _tax;
        saleRoyalty = _saleRoyalty;

        // addresses
        beneficiary = _beneficiary;
        factory = msg.sender;
    }

    modifier onlyFanHeld() virtual {
        if (fan == address(this)) {
            revert ContractHoldsPendulum();
        }
        _;
    }

    modifier onlyExpertControlled() virtual {
        if (fan != address(this) && fan != owner()) {
            revert ExpertDoesNotHavePendulum();
        }
        if (auctionEndTime > 0) {
            revert AuctionRunning();
        }
        _;
    }

    modifier notDuringAuction() virtual {
        if (_auctionRunning()) {
            revert AuctionRunning();
        }
        _;
    }
    modifier onlyFanSolvent() virtual {
        if (!fanSolvent()) {
            revert FanInsolvent();
        }
        _;
    }

    function deposit() external payable virtual {
        if (msg.sender == fan && !fanSolvent()) {
            revert FanInsolvent();
        }
        fundsOf[msg.sender] += msg.value;
    }

    function fanSolvent() public view returns (bool) {
        if (owner() == fan) {
            return true;
        }

        return fundsOf[fan] >= _owedSinceLastSettlement();
    }

    function _owedSinceLastSettlement() internal view returns (uint) {
        uint256 secondsSinceLastSettlement = block.timestamp -
            lastSettlementTime;
        return
            (price * tax * secondsSinceLastSettlement) /
            (_TAX_PERIOD * _FEE_DENOMINATOR);
    }

    function setPrice(uint256 newPrice) external virtual onlyFanSolvent {
        _settle();
        _setPrice(newPrice);
    }

    function _settle() internal virtual {
        if (owner() == fan) {
            lastSettlementTime = block.timestamp;
            return;
        }

        uint256 availableFunds = fundsOf[fan];
        uint256 owedFunds = _owedSinceLastSettlement();
        uint256 transferableToBeneficiary = availableFunds <= owedFunds
            ? availableFunds
            : owedFunds;

        fundsOf[fan] -= transferableToBeneficiary;
        fundsOf[beneficiary] += transferableToBeneficiary;

        lastSettlementTime = block.timestamp;

        emit Settlement(fan, beneficiary, transferableToBeneficiary);
    }

    function _setPrice(uint newPrice) internal virtual {
        if (newPrice > _MAXIMUM_PRICE) {
            revert InvalidNewPrice(newPrice);
        }
        price = newPrice;
    }

    function withdrawAll() external virtual {
        _withdraw(msg.sender, fundsOf[msg.sender]);
    }

    function withdraw(uint256 _amount) external virtual {
        _withdraw(msg.sender, _amount);
    }

    function _withdraw(address _recipient, uint256 _amount) private {
        if (_recipient == leadingBidder) {
            revert NotPermittedForLeadingBidder();
        }

        if (fundsOf[_recipient] < _amount) {
            revert InsufficientFunds(fundsOf[_recipient], _amount);
        }

        fundsOf[_recipient] -= _amount;

        AddressUpgradeable.sendValue(payable(_recipient), _amount);
    }

    // only allows expert to start the auction.
    //Need one more way for any holder to start the auciton to relinquish control
    function setAuctionParameters(
        uint256 newStartingPrice,
        uint256 newMinBidStep,
        uint256 newMinDuration
    )
        external
        virtual
    // ) external virtual onlyOwner onlyExpertControlled notDuringAuction {
    {
        if (newMinDuration == 0) {
            revert InvalidAuctionDuration(newMinDuration);
        }

        auctionStartingPrice = newStartingPrice;
        auctionMinBidStep = newMinBidStep > 0 ? newMinBidStep : 1;
        auctionMinDuration = newMinDuration;

        // emit the new changes
        emit AuctionParametersChanged(
            newStartingPrice,
            newMinBidStep,
            newMinDuration
        );
    }

    function startAuction() external // virtual onlyOwner notDuringAuction
    {
        // TODO if fan is the expert might allow them?
        if (address(this) != fan) {
            revert ContractDoesNotHoldPendulum();
        }

        if (auctionEndTime > 0) {
            revert AuctionRunning();
        }

        auctionEndTime = block.timestamp + auctionMinDuration;
        _setValidUntil(auctionEndTime + validUntil);

        emit AuctionStarted(block.timestamp, auctionEndTime);
    }

    function bid(
        uint256 amount,
        uint256 newPendulumPrice
    ) external payable virtual {
        // if (!_auctionRunning()) {
        //     revert AuctionNotRunning();
        // }

        // // if owner is bidding himself or beneficiery is bidding
        // if (msg.sender == owner() || msg.sender == beneficiary) {
        //     revert NotPermitted();
        // }

        uint256 totalFunds = fundsOf[msg.sender] + msg.value;

        // revert if amount is less than minimum bid
        if (amount < minimumBid()) {
            revert InsufficientBid(amount, minimumBid());
        }

        if (totalFunds < amount) {
            revert InsufficientFunds(totalFunds, amount);
        }

        if (newPendulumPrice > _MAXIMUM_PRICE) {
            revert InvalidNewPrice(newPendulumPrice);
        }

        fundsOf[msg.sender] = totalFunds;
        leadingBidder = msg.sender;
        // should this be totalFunds or amount
        // if someone bid x and then bid y -> amount will leave it at y but total funds would be x+y
        leadingBid = amount;

        if (block.timestamp + _AUCTION_BID_EXTENSION > auctionEndTime) {
            auctionEndTime = block.timestamp + _AUCTION_BID_EXTENSION;
        }

        emit Bid(leadingBidder, leadingBid);

        // revert if amount paid is less than amount said
    }

    // transfer winning bid to beneficiery, orb to the winner, if it was started by previous keeper than
    // then most of the procceds - royalty for platform and expert go to the keeper.
    // orb also allows for previous fans to do auction, this does not implement that TODO maybe after the hack
    function finalizeAuction() external virtual //notDuringAuction
    {
        if (auctionEndTime == 0) {
            revert AuctionNotRunning();
        }

        if (leadingBidder != address(0)) {
            fundsOf[leadingBidder] -= leadingBid;

            // TODO handle transfers, and send proceeds
            fundsOf[beneficiary] += leadingBid; // add a cut to the platform here TODO

            _transferPendulum(fan, leadingBidder);

            emit FinalizeAuction(leadingBidder, leadingBid);

            leadingBidder = address(0);
            leadingBid = 0;
        }

        //because auction ended
        auctionEndTime = 0;
    }

    function minimumBid() public view virtual returns (uint256 auctionMinBid) {
        if (leadingBid == 0) {
            if (auctionStartingPrice == 0) {
                return auctionMinBidStep;
            } else {
                return auctionStartingPrice;
            }
        } else {
            return leadingBid + auctionMinBidStep;
        }
    }

    function _auctionRunning() private view returns (bool) {
        return block.timestamp < auctionEndTime;
    }

    function _transferPendulum(address from, address to) internal virtual {
        fan = to;
        emit Transfer(from, to, 1);
    }
}
