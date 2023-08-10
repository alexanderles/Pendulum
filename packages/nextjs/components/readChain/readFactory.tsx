import { useEffect, useRef, useState } from "react";
import Button from "../Button";
import FormItem from "../Forms/FormItem";
import Input from "../Forms/Input";
import { PendulumThumbnail } from "./pendulumThumbnail";
// import { PendulumPageCard } from "./readPendulum";
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

export const PendulumFactoryPageCard = () => {
  const [pendulumId, setPendulumId] = useState(0);
  const [allPendulums, setAllPendulums] = useState<any>([]);

  const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: PendulumCount } = useScaffoldContractRead({
    contractName: "PendulumFactory",
    functionName: "pendulumCount",
  });

  const { data: currentPendulum } = useScaffoldContractRead({
    contractName: "PendulumFactory",
    functionName: "pendulums",
    args: [BigInt(pendulumId)],
  });

  function addToAllPendulums() {
    setAllPendulums([...allPendulums, currentPendulum]);
  }

  useScaffoldEventSubscriber({
    contractName: "PendulumFactory",
    eventName: "Creation",
    listener: logs => {
      logs.map(log => {
        const { name, count, pendulumAddr } = log.args;
        console.log("📡 Auction Parameters Changed", name, count, pendulumAddr);
      });
    },
  });

  const {
    data: auctionParametersChanged,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "PendulumFactory",
    eventName: "Creation",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    //filters: { name: BigInt, count: BigInt, newMinDuration: BigInt },
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, auctionParametersChanged);

  const { data: PendulumFactory } = useScaffoldContract({ contractName: "PendulumFactory" });
  console.log("PendulumFactory: ", PendulumFactory);

  return (
    <div className="flex flex-col justify-center items-center bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <h1>Pendulums Created: {PendulumCount?.toString()}</h1>
      <div>
        <FormItem label="Get a pendulum with it's count">
          <Input placeholder="0" onChange={e => setPendulumId(e.target.value)} />
        </FormItem>
        <Button type="submit" onClick={() => addToAllPendulums()}>
          Get Pendulum
        </Button>
      </div>
      <div>
        {allPendulums.map((pendulum: any) => {
          return (
            <div>
              <PendulumThumbnail address={pendulum}></PendulumThumbnail>
              {/* <PendulumPageCard address={pendulum}></PendulumPageCard> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};
