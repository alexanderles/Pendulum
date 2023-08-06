// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC1967Proxy} from "../lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import {OwnableUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/utils/UUPSUpgradeable.sol";
import {ClonesUpgradeable} from "../lib/openzeppelin-contracts-upgradeable/contracts/proxy/ClonesUpgradeable.sol";
import "./Pendulum.sol";
import "./interfaces/IOwnershipTransferrable.sol";

contract PendulumFactory is OwnableUpgradeable, UUPSUpgradeable {
    uint256 private constant _VERSION = 1;
    mapping(uint256 => address) public pendulums;
    uint256 public pendulumCount;
    mapping(uint256 versionNumber => address implementation) public versions;

    event Creation(
        string indexed name,
        uint256 count,
        address indexed pendulumAddr
    );

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function createPendulum(
        string memory name,
        string memory symbol,
        string memory tokenURI,
        uint256 _auctionStartingPrice,
        uint256 _auctionMinBidStep,
        uint256 _auctionMinDuration,
        uint256 _auctionBidExtension,
        address _beneficiary
    ) external virtual onlyOwner {
        bytes memory initializeCalldata = abi.encodeWithSelector(
            Pendulum.initialize.selector,
            name,
            symbol,
            tokenURI,
            _auctionStartingPrice,
            _auctionMinBidStep,
            _auctionMinDuration,
            _auctionBidExtension,
            _beneficiary
        );
        ERC1967Proxy proxy = new ERC1967Proxy(versions[1], initializeCalldata);
        pendulums[pendulumCount] = address(proxy);
        IOwnershipTransferrable(pendulums[pendulumCount]).transferOwnership(
            msg.sender
        );

        emit Creation(name, pendulumCount, address(proxy));

        pendulumCount++;
    }

    function registerVersion(
        uint256 version_,
        address implementation_
    ) external virtual onlyOwner {
        versions[version_] = implementation_;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}
