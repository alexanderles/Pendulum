// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "../lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Upgrade.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/Proxy.sol";

contract CreateProxy is Proxy, ERC1967Upgrade {
    constructor(address _logic, bytes memory _data) payable {
        _upgradeToAndCall(_logic, _data, false);
    }

    function _implementation()
        internal
        view
        virtual
        override
        returns (address impl)
    {
        return ERC1967Upgrade._getImplementation();
    }
}
