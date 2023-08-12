//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/Pendulum.sol";
import "../contracts/ResponseRegistry.sol";
import "../contracts/PendulumFactory.sol";
import "./DeployHelpers.s.sol";
//import {ERC1967Proxy} from "../lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
// import "../lib/forge-std/src/console.sol";
import "forge-std/console.sol";
import {CreateProxy} from "../contracts/CreateProxy.sol";

contract DeployScript is ScaffoldETHDeploy {
    string public name;
    string public symbol;
    string public tokenURI;
    uint256 public auctionStartingPrice;
    uint256 public auctionMinBidStep;
    uint256 public auctionMinDuration;

    address public beneficiary;
    uint public validUntil;

    uint public questionFrequency;
    uint public tax;
    uint public saleRoyalty;

    Pendulum public pendulum;
    PendulumFactory public pendulumFactory;
    ResponseRegistry public registry;

    function run() external {
        name = "Pendulum";
        symbol = "PP";
        tokenURI = "";
        auctionStartingPrice = 0 ether; //set default to 0
        auctionMinBidStep = 0.05 ether; //set default to 0
        auctionMinDuration = 1 days; //set default to 1 days
        beneficiary = msg.sender;
        validUntil = 30 days;
        questionFrequency = 7 days;
        tax = 5_00;
        saleRoyalty = 10_00;

        uint256 deployerPrivateKey = setupLocalhostEnv();

        vm.startBroadcast(deployerPrivateKey);

        registry = new ResponseRegistry();
        console.log("Registry Impl:", address(registry));

        CreateProxy registryProxy = new CreateProxy(
            address(registry),
            abi.encodeWithSelector(registry.initialize.selector)
        );

        registry = ResponseRegistry(address(registryProxy));
        console.log("Registry :", address(registry));

        pendulumFactory = new PendulumFactory();
        console.log("Pendulum Factory Impl:", address(pendulumFactory));

        CreateProxy pendulumFactoryProxy = new CreateProxy(
            address(pendulumFactory),
            abi.encodeWithSelector(
                pendulumFactory.initialize.selector,
                address(registry)
            )
        );

        pendulumFactory = PendulumFactory(address(pendulumFactoryProxy));
        console.log("PendulumFactory: ", address(pendulumFactory));
        console.log("Deploy Caller", msg.sender);
        console.log("Factory Owner", pendulumFactory.owner());

        pendulum = new Pendulum();
        console.log("Pendulum Implementation:", address(pendulum));

        pendulumFactory.registerVersion(1, address(pendulum));
        console.log("Version registered");
        // pendulumFactory.createPendulum(
        //     name,
        //     symbol,
        //     tokenURI,
        //     auctionStartingPrice,
        //     auctionMinBidStep,
        //     auctionMinDuration,
        //     beneficiary,
        //     validUntil,
        //     questionFrequency,
        //     tax,
        //     saleRoyalty
        // );

        // pendulum = Pendulum(pendulumFactory.pendulums(0));
        // console.log("Pendulum:", address(pendulum));

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