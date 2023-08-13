import { useEffect, useRef, useState } from "react";
import { Ether } from "@uniswap/sdk-core";
import type { ExtractAbiFunctionNames } from "abitype";
import { ethers } from "ethers";
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";
import { formatEthereumAddress } from "~~/utils/pendulumUtis";
import { ContractAbi, ContractName } from "~~/utils/scaffold-eth/contract";

const MARQUEE_PERIOD_IN_SEC = 5;

export const Pendulum = ({ address }: { address?: string }) => {
  // const [transitionEnabled, setTransitionEnabled] = useState(true);
  // const [isRightDirection, setIsRightDirection] = useState(false);
  // const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  // const containerRef = useRef<HTMLDivElement>(null);
  // const greetingRef = useRef<HTMLDivElement>(null);

  const { data: pendulumName } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "name",
    address,
  });

  const { data: auctionStartingPrice } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "auctionStartingPrice",
    address,
  });

  const { data: auctionMinBidStep } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "auctionMinBidStep",
    address,
  });
  const { data: auctionMinDuration } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "auctionMinDuration",
    address,
  });

  const { data: auctionEndTime } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "auctionEndTime",
    address,
  });

  const { data: validUntil } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "validUntil",
    address,
  });

  const { data: leadingBidder } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "leadingBidder",
    address,
  });
  const { data: leadingBid } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "leadingBid",
    address,
  });

  const { data: minimumBid } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "minimumBid",
    address,
  });

  const getAddress = formatEthereumAddress(address);

  useScaffoldEventSubscriber({
    contractName: "Pendulum",
    eventName: "AuctionParametersChanged",
    listener: logs => {
      logs.map(log => {
        const { newStartingPrice, newMinBidStep, newMinDuration } = log.args;
        console.log("📡 Auction Parameters Changed", newStartingPrice, newMinBidStep, newMinDuration);
      });
    },
  });

  const {
    data: auctionParametersChanged,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "Pendulum",
    eventName: "AuctionParametersChanged",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    //filters: { newStartingPrice: BigInt, newMinBidStep: BigInt, newMinDuration: BigInt },
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, auctionParametersChanged);

  const { data: pendulum } = useScaffoldContract({ contractName: "Pendulum" });
  console.log("Pendulum: ", pendulum);
};
