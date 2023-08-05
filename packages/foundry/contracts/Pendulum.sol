// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC721Upgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/ERC721Upgradeable.sol";
import "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {OwnableUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";

// used to check if receiver is ERC721ReceiverUpgradeable
import "../lib/openzeppelin-contracts-upgradeable/contracts/token/ERC721/IERC721ReceiverUpgradeable.sol";

// TODO make sure what the difference between setApproval and setApprovalForAll is

contract Pendulum is ERC721Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    // This function will be called by parent class to initialize the ERC721

    function initialize(
        string memory name_,
        string memory symbol_
    ) external initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __ERC721_init(name_, symbol_);
    }

    // function supportsInterface(
    //     bytes4 interfaceId
    // ) public view override(ERC721P, IERC165Upgradeable) returns (bool) {
    //     return
    //         interfaceId == type(IPendulum).interfaceId ||
    //         interfaceId == type(IERC721Upgradeable).interfaceId ||
    //         interfaceId == type(IERC721MetadataUpgradeable).interfaceId ||
    //         super.supportsInterface(interfaceId);
    // }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function getImplementation() external view returns (address) {
        return _getImplementation();
    }
}
