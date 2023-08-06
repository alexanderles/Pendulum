//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/Pendulum.sol";
import "./DeployHelpers.s.sol";
import {ERC1967Proxy} from "../lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
// import "../lib/forge-std/src/console.sol";
import "forge-std/console.sol";

contract DeployScript is ScaffoldETHDeploy {
    string private name;
    string private symbol;
    Pendulum public pendulum;

    function run() external {
        name = "Pendulum";
        symbol = "PP";
        uint256 deployerPrivateKey = setupLocalhostEnv();

        vm.startBroadcast(deployerPrivateKey);

        pendulum = new Pendulum();
        console.log("Pendulum Implementation:", address(pendulum));

        ERC1967Proxy proxy = new ERC1967Proxy(
            address(pendulum),
            abi.encodeWithSelector(pendulum.initialize.selector, name, symbol)
        );
        pendulum = Pendulum(address(proxy));
        console.log("Pendulum:", address(pendulum));

        vm.stopBroadcast();

        /**
         * This function generates the file containing the contracts Abi definitions.
         * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
         * This function should be called last.
         */
        exportDeployments();

        // If your chain is not present in foundry's stdChain, then you need to call function with chainName:
        // exportDeployments("chiado")
    }

    function test() public {}
}
