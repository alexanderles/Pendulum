// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC165Upgradeable} from "../../lib/openzeppelin-contracts-upgradeable/contracts/utils/introspection/IERC165Upgradeable.sol";

interface IPendulum is IERC165Upgradeable {
    //EVENTS
    event AuctionParametersChanged(
        uint indexed newStartingPrice,
        uint indexed newMinBidStep,
        uint indexed newMinDuration
    );

    event AuctionStarted(
        uint256 indexed auctionStartTime,
        uint256 indexed auctionEndTime
    );

    event Bid(address indexed bidder, uint256 indexed bid);

    event FinalizeAuction(address indexed newFan, uint256 indexed winningBid);

    error ContractHoldsPendulum();
    error ExpertDoesNotHavePendulum();
    error AuctionRunning();
    error AuctionNotRunning();
    error FanInsolvent();
    error NotPermitted();
    error InsufficientBid(uint, uint);
    error InvalidAuctionDuration(uint);
    error InvalidDuration(uint, uint);
    error ContractDoesNotHoldPendulum();
    error InsufficientFunds(uint, uint);
    error InvalidNewPrice(uint);

    function setAuctionParameters(
        uint256 newStartingPrice,
        uint256 newMinBidStep,
        uint256 newMinDuration
    ) external;

    function startAuction() external;

    function bid(uint256 amount, uint256 newPendulumPrice) external payable;

    function finalizeAuction() external;

    function minimumBid() external returns (uint256);
}
