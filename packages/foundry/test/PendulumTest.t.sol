// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/console.sol";
import "forge-std/Test.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "../contracts/Pendulum.sol";

contract PendulumTestBase is Test {
    Pendulum public pendulum;

    string public pendulumName;
    string public pendulumSymbol;

    function setUp() public {
        // pendulum = new Pendulum();
        // pendulumName = "Pendulum";
        // pendulumSymbol = "Pen";
        // ERC1967Proxy proxy = new ERC1967Proxy(
        //     address(pendulum),
        //     abi.encodeWithSelector(
        //         pendulum.initialize.selector,
        //         pendulumName,
        //         pendulumSymbol
        //     )
        // );
        // pendulum = Pendulum(address(proxy));
    }

    function testInitialization() public {
        // assertEq(pendulum.name(), "Pendulum");
        // assertEq(pendulum.symbol(), "Pen");
        // assertEq(pendulum.owner(), address(this));
    }
}
