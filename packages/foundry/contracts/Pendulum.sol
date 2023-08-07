// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721Upgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/ERC721Upgradeable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";

// used to check if receiver is ERC721ReceiverUpgradeable
import "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/IERC721ReceiverUpgradeable.sol";

// TODO make sure what the difference between setApproval and setApprovalForAll is

contract Pendulum is ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    //EVENTS

    event AuctionParametersChanged(
        uint indexed newStartingPrice,
        uint indexed newMinBidStep,
        uint indexed newMinDuration
    );
    // CONSTANT
    uint256 private constant _VERSION = 1;

    uint256 internal constant _FEE_DENOMINATOR = 100_00;

    uint256 internal constant _TAX_PERIOD = 7 days; // can make minimum 1 day

    uint256 internal constant _MAXIMUM_DURATION = 365 days;

    uint256 internal constant _MAXIMUM_PRICE = 2 ** 128;

    uint256 internal constant _AUCTION_BID_EXTENSION = 900;

    string internal _tokenURI;
    // Address variables
    address public factory;
    address public beneficiary; // TODO prolly don't need this

    // Auction Parameters
    uint256 public auctionStartingPrice;
    uint256 public auctionMinBidStep;
    uint256 public auctionMinDuration;

    uint256 public auctionEndTime; // 0 when not in auction
    address public leadingBidder; // leading bidder in auction
    uint256 public leadingBid; // leading bid made my the leading bidder

    string public someName;

    // This function will be called by parent class to initialize the ERC721
    function initialize(
        string memory name_,
        string memory symbol_,
        string memory tokenURI_,
        uint256 _auctionStartingPrice, //set default to 0
        uint256 _auctionMinBidStep, //set default to 0
        uint256 _auctionMinDuration, //set default to 1 days, acts as end time
        address _beneficiary
    ) external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC721_init(name_, symbol_);

        _tokenURI = tokenURI_;
        // Auction Parameters
        auctionStartingPrice = _auctionStartingPrice;
        auctionMinBidStep = _auctionMinBidStep;
        auctionMinDuration = _auctionMinDuration;
        // auctionKeeperMinimumDuration = 1 days; TODO same as auctionMinDuration

        // addresses
        beneficiary = _beneficiary;
        factory = msg.sender;
    }

    function setAuctionParameters(
        uint256 newStartingPrice,
        uint256 newMinBidStep,
        uint256 newMinDuration // uint256 newKeeperMinDuration,
    ) external virtual {
        auctionStartingPrice = newStartingPrice;
        auctionMinBidStep = newMinBidStep > 0 ? newMinBidStep : 1;
        auctionMinDuration = newMinDuration;
        // TODO keeper min duration

        // emit the new changes
        emit AuctionParametersChanged(
            newStartingPrice,
            newMinBidStep,
            newMinDuration
        );
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    function setName(string memory newName) public {
        someName = newName;
    }
}
