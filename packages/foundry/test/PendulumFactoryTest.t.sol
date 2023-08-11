// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/console.sol";
import "forge-std/Test.sol";
import "../lib/openzeppelin-contracts/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "../contracts/Pendulum.sol";
import "../contracts/PendulumFactory.sol";
import {CreateProxy} from "../contracts/CreateProxy.sol";

contract PendulumFactoryTest is Test {
    string public name;
    string public symbol;
    string public tokenURI;
    uint256 public auctionStartingPrice;
    uint256 public auctionMinBidStep;
    uint256 public auctionMinDuration;
    uint256 public validUntil;

    address public beneficiary;

    uint public questionFrequency;
    uint public tax;
    uint public saleRoyalty;

    Pendulum public pendulum;
    PendulumFactory public pendulumFactory;

    function setUp() public {
        name = "Pendulum";
        symbol = "PP";
        tokenURI = "";
        auctionStartingPrice = 0 ether; //set default to 0
        auctionMinBidStep = 0.05 ether; //set default to 0
        auctionMinDuration = 1 days; //set default to 1 days
        validUntil = 30 days;
        beneficiary = msg.sender;
        validUntil = 5 days;
        questionFrequency = 7 days;
        tax = 5_00;
        saleRoyalty = 10_00;

        pendulumFactory = new PendulumFactory();
        console.log("Pendulum Factory Impl:", address(pendulumFactory));

        CreateProxy pendulumFactoryProxy = new CreateProxy(
            address(pendulumFactory),
            abi.encodeWithSelector(pendulumFactory.initialize.selector)
        );

        pendulumFactory = PendulumFactory(address(pendulumFactoryProxy));
        console.log("PendulumFactory: ", address(pendulumFactory));
        console.log("Deploy Caller", msg.sender);
        console.log("Factory Owner", pendulumFactory.owner());

        pendulum = new Pendulum();
        console.log("Pendulum Implementation:", address(pendulum));

        pendulumFactory.registerVersion(1, address(pendulum));
        console.log("Version registered");
    }

    function testCreatePendulum() public {
        pendulumFactory.createPendulum(
            "Pendulum1",
            symbol,
            tokenURI,
            auctionStartingPrice,
            auctionMinBidStep,
            auctionMinDuration,
            beneficiary,
            validUntil,
            questionFrequency,
            tax,
            saleRoyalty
        );

        Pendulum pendulum1 = new Pendulum();
        pendulum1 = Pendulum(pendulumFactory.pendulums(0));
        console.log("Pendulum1: ", address(pendulum1));

        pendulumFactory.createPendulum(
            "Pendulum2",
            symbol,
            tokenURI,
            auctionStartingPrice,
            auctionMinBidStep,
            auctionMinDuration,
            beneficiary,
            validUntil,
            questionFrequency,
            tax,
            saleRoyalty
        );

        Pendulum pendulum2 = new Pendulum();
        pendulum2 = Pendulum(pendulumFactory.pendulums(1));
        console.log("Pendulum2: ", address(pendulum2));

        pendulumFactory.createPendulum(
            "Pendulum3",
            symbol,
            tokenURI,
            auctionStartingPrice,
            auctionMinBidStep,
            auctionMinDuration,
            beneficiary,
            validUntil,
            questionFrequency,
            tax,
            saleRoyalty
        );

        Pendulum pendulum3 = new Pendulum();
        pendulum3 = Pendulum(pendulumFactory.pendulums(2));
        console.log("Pendulum3: ", address(pendulum3));

        assertEq(pendulum1.name(), "Pendulum1");
        assertEq(pendulum2.name(), "Pendulum2");
        assertEq(pendulum3.name(), "Pendulum3");

        assertEq(pendulumFactory.getVersion(1), address(pendulum));

        assertEq(pendulumFactory.pendulumCount(), 3);
    }
}
