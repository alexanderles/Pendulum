import { useEffect, useRef, useState } from "react";
import { Ether } from "@uniswap/sdk-core";
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

  function secondsToDhms(seconds: number) {
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

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
        <div>
          <div>{pendulumName}</div>
          <div>{address}</div>

          {/* Starting price */}
          <div>
            {auctionStartingPrice ? (
              ethers.formatEther(auctionStartingPrice?.toString()).toString()
            ) : (
              <>No Starting Price</>
            )}
          </div>

          {/* Minimum bid step */}
          <div>
            {auctionMinBidStep ? (
              ethers.formatEther(auctionMinBidStep?.toString()).toString()
            ) : (
              <>No minimum bid step</>
            )}
          </div>

          {/* Minimum auction duration */}
          <div>{auctionMinDuration ? secondsToDhms(Number(auctionMinDuration)) : <>No minimum auction duration</>}</div>

          {/* Time until end of auction */}
          <div>{auctionEndTime ? secondsToDhms(Number(auctionEndTime)) : <>No auction end time</>}</div>

          {/* Leading bidder */}
          <div>
            {leadingBidder && ethers.getAddress(leadingBidder) != ethers.ZeroAddress ? (
              ethers.getAddress(leadingBidder)
            ) : (
              <>No leading bidder</>
            )}
          </div>

          {/* Leading bid */}
          <div>{leadingBid ? ethers.formatEther(leadingBid?.toString()).toString() : <>No leading bid</>}</div>
        </div>
      </div>
    </div>
  );
};
