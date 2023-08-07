import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const PendulumPageCard = ({ address }: { address?: string }) => {
  //   const { address } = useAccount();
  //   const [transitionEnabled, setTransitionEnabled] = useState(true);
  //   const [isRightDirection, setIsRightDirection] = useState(false);
  //   const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  //   const containerRef = useRef<HTMLDivElement>(null);
  //   const greetingRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/gradient-bg.png')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div>
        <ul>
          <li>{pendulumName}</li>
          <li>{address}</li>
          <li>{auctionStartingPrice?.toString()}</li>
          <li>{auctionMinBidStep?.toString()}</li>
          <li>{auctionMinDuration?.toString()}</li>
          <li>{auctionEndTime?.toString()}</li>
          <li>{leadingBidder}</li>
          <li>{leadingBid?.toString()}</li>
        </ul>
      </div>
    </div>
  );
};
