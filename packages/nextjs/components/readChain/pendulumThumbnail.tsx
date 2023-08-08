import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Ether } from "@uniswap/sdk-core";
import { ethers } from "ethers";
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import { ArrowRightIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/outline";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const PendulumThumbnail = ({ address }: { address?: string }) => {
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
      <div className="relative rounded-2xl shadow-lg w-72">
        <img src="/purple-gradient-1.jpg" alt="NFT Title" className="object-cover rounded-2xl h-56" />
        <div className="absolute top-0 left-0 p-2 rounded-tl-lg">
          <div className="flex w-full justify-left items-center">
            <div className="flex relative w-10 h-10 mr-2">
              <Image alt="Profile" fill src={"/punkpfp1.jpg"} className="rounded-full" />
            </div>
            <div>Spencer Pen</div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 p-2 pr-3 pl-3 bg-slate-100 text-stone-800 font-sans font-semibold rounded-tr-xl rounded-bl-2xl rounded-br-none rounded-tl-none">
          <div className=" mb-2">
            {pendulumName}
          </div>
          <div>
            <span>Price: </span>
            <span className="text-green-600">1.5 ETH</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
          <div className="bg-black bg-opacity-50 p-2 w-2/3 rounded-xl grid grid-cols-3">
            <div className="text-2xs justify-center">
                <p className="mt-0 mb-1">Stops</p>
                <p className="mb-0 mt-1">7 Days</p>
            </div>
            <div className="text-2xs justify-center">
                <p className="mt-0 mb-1">Breaks</p>
                <p className="mb-0 mt-1">4 weeks</p>
            </div>
            <div className="text-2xs justify-center">
                <p className="mt-0 mb-1">Recharge</p>
                <p className="mb-0 mt-1">7% /week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
