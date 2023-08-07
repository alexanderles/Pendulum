// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Reimplementing ERC721Upgradeable interface to support the functions we need in a way we need them.
// The standard implementation uses a lot of unncessary variables for our use

import {IERC721MetadataUpgradeable, IERC721Upgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/extensions/IERC721MetadataUpgradeable.sol";
import {AddressUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/utils/AddressUpgradeable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {ERC165Upgradeable, IERC165Upgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/utils/introspection/ERC165Upgradeable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/ERC721Upgradeable.sol";
import {ContextUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/utils/ContextUpgradeable.sol";
import {OwnableUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";

// used to check if receiver is ERC721ReceiverUpgradeable
import "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/IERC721ReceiverUpgradeable.sol";

error ZeroAddress();
error ApprovalToCurrentOwner();
error CallerNotApproved();
error ReceiverDoesNotImplement721Specs();
error BurnNotSupported();
error NotCollectible();
error NotExpert();
error NotFan();
error InvalidTokenId();

contract ERC721P is
    Initializable,
    ContextUpgradeable,
    ERC165Upgradeable,
    IERC721Upgradeable,
    IERC721MetadataUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    // to use different functions for addresses
    using AddressUpgradeable for address;

    // token name, this could be expertname plus question
    string public name;

    // token symbol, this could be expert name plus question initials
    string public symbol;

    // will store NFT metadata. Cannot exceed 31 chars. use IPFS
    string internal _tokenURI;

    // fan who will purchage the token. This is initially contract iteself, and changes when someone wins auction
    address public fan;

    // there will only be one version of a pendulum
    uint256 internal constant _TOKEN_ID = 1;

    // time when the NFT becomes a collectible
    uint256 public validUntil;

    mapping(address => mapping(address => bool)) private _operatorApprovals;

    modifier notZeroAddress(address _caller) virtual {
        if (_caller == address(0)) {
            revert ZeroAddress();
        }
        _;
    }

    // Can make this not take argument since only one token ID
    modifier callerShouldBeApproved() {
        if (!_isApprovedOrOwner(_msgSender())) {
            revert CallerNotApproved();
        }
        _;
    }

    modifier onlyFan(address caller) virtual {
        if (caller != fan) {
            revert NotFan();
        }
        _;
    }

    // Will only run when pendulum becomes a collectible after it expires
    modifier onlyCollectible() virtual {
        if (block.timestamp < validUntil) {
            revert NotCollectible();
        }
        _;
    }

    modifier validToken(uint256 _tokenId) virtual {
        if (_tokenId != _TOKEN_ID) {
            revert InvalidTokenId();
        }
        _;
    }

    // This function will be called by parent class to initialize the ERC721
    function __ERC721_init(
        string memory name_,
        string memory symbol_,
        string memory tokenURI_,
        uint256 _validUntil
    ) internal onlyInitializing {
        // sets the caller as the owner. Factory would be the owner.
        // TODO make the expert owner
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC721_init_unchained(name_, symbol_, tokenURI_);

        // initially the contract is the fan
        fan = address(this);

        // initially it's not a collectible

        validUntil = _validUntil;
    }

    function __ERC721_init_unchained(
        string memory name_,
        string memory symbol_,
        string memory tokenURI_
    ) internal onlyInitializing {
        name = name_;
        symbol = symbol_;
        _tokenURI = tokenURI_;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    // TODO OVERRIDE THIS TO SUPPORT IPENNDULUM
    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC165Upgradeable, IERC165Upgradeable)
        returns (bool)
    {
        // chagnge this to supprt IPendulum and other interfaces
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev See {IERC721-approve}.
     */
    function approve(
        address to,
        uint256 tokenId
    )
        public
        virtual
        override
        notZeroAddress(to)
        validToken(tokenId)
        onlyFan(msg.sender)
        onlyCollectible
    {
        // fan can't be the owner
        if (to == fan) {
            revert ApprovalToCurrentOwner();
        }

        // approve the to address
        _approve(to, tokenId);
    }

    function setApprovalForAll(
        address operator,
        bool approved
    ) public virtual override {
        _setApprovalForAll(_msgSender(), operator, approved);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override validToken(tokenId) {
        //solhint-disable-next-line max-line-length
        _transfer(from, to);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        safeTransferFrom(from, to, tokenId, "");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public virtual override {
        _safeTransfer(from, to, tokenId, data);
    }

    // owner parameter is useless here
    function isApprovedForAll(
        address _owner,
        address operator
    ) public view virtual override returns (bool) {
        return _operatorApprovals[_owner][operator];
    }

    ///// GETTERS //////

    // returns the current owner who has all the approvals
    function getApproved(
        uint256 tokenId
    ) public view virtual override validToken(tokenId) returns (address) {
        return fan;
    }

    function balanceOf(
        address _owner
    )
        public
        view
        virtual
        override
        notZeroAddress(_owner)
        returns (uint256 tokenID)
    {
        tokenID = _owner == fan ? 1 : 0;
    }

    // only 1 exists
    function ownerOf(
        uint256 _tokenId
    ) public view virtual override returns (address) {
        return _ownerOf(_tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        if (tokenId != _TOKEN_ID) {
            revert InvalidTokenId();
        }
        return _tokenURI;
    }

    //// PRIVATE FUNCTIONS /////

    function _safeTransfer(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) internal virtual validToken(tokenId) {
        if (!_checkOnERC721Received(from, to, tokenId, data)) {
            revert ReceiverDoesNotImplement721Specs();
        }
        _transfer(from, to);
    }

    function _ownerOf(uint256 tokenId) internal view virtual returns (address) {
        return tokenId == _TOKEN_ID ? fan : address(0);
    }

    function _isApprovedOrOwner(
        address spender
    ) internal view virtual returns (bool) {
        return (spender == fan ||
            isApprovedForAll(fan, spender) ||
            getApproved(_TOKEN_ID) == spender);
    }

    function _transfer(
        address from,
        address to
    ) internal virtual onlyCollectible onlyFan(msg.sender) {
        if (from != fan) {
            revert NotExpert();
        }

        if (to == address(0)) {
            revert ZeroAddress();
        }

        // prolly don't need this
        //_beforeTokenTransfer(from, to, tokenId, 1);

        // Check that tokenId was not transferred by `_beforeTokenTransfer` hook
        // if (from != fan) {
        //     revert NotExpert();
        // }

        // REMOVED THIS COZ MIGHT NOT NEED TO DELETE APPROVAL, can set them to false
        // Clear approvals from the previous owner
        //delete _tokenApprovals[tokenId];
        //delete _operatorApprovals[fan];

        //fan = to; // change the fan
        fan = to;
        _transferOwnership(to);

        emit Transfer(from, to, _TOKEN_ID);

        // might not need this either
        //_afterTokenTransfer(from, to, tokenId, 1);
    }

    function _approve(
        address to,
        uint256 tokenId
    ) internal virtual onlyCollectible {
        _operatorApprovals[fan][to] = true;
        emit Approval(fan, to, tokenId);
    }

    function _setApprovalForAll(
        address _owner,
        address operator,
        bool approved
    ) internal virtual onlyCollectible onlyFan(_owner) {
        if (_owner == operator) {
            revert ApprovalToCurrentOwner();
        }

        _operatorApprovals[_owner][operator] = approved;

        emit ApprovalForAll(_owner, operator, approved);
    }

    // TODO leaves room for rentrency, make sure we really need this
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) private returns (bool) {
        if (to.isContract()) {
            try
                IERC721ReceiverUpgradeable(to).onERC721Received(
                    _msgSender(),
                    from,
                    tokenId,
                    data
                )
            returns (bytes4 retval) {
                return
                    retval ==
                    IERC721ReceiverUpgradeable.onERC721Received.selector;
            } catch (bytes memory reason) {
                if (reason.length == 0) {
                    revert ReceiverDoesNotImplement721Specs();
                } else {
                    /// @solidity memory-safe-assembly
                    assembly {
                        revert(add(32, reason), mload(reason))
                    }
                }
            }
        } else {
            return true;
        }
    }

    function _setValidUntil(uint256 newValidUntil) internal {
        validUntil = newValidUntil;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }

    // TODO may not need this
    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 firstTokenId,
    //     uint256 batchSize
    // ) internal virtual {}

    // function _afterTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 firstTokenId,
    //     uint256 batchSize
    // ) internal virtual {}

    //uint256[44] private __gap;
}
