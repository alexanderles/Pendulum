import { useState } from "react";
import Button from "../Button";
import FormItem from "../Forms/FormItem";
import Input from "../Forms/Input";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const CreatePendulum = () => {
  const [topicName, setTopicName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [auctionStartingPrice, setAuctionStartingPrice] = useState(0);
  const [auctionMinBidStep, setAuctionMinBidStep] = useState(0);
  const [auctionMinDuration, setAuctionMinDuration] = useState(0);
  const [beneficiary, setBeneficiary] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const [validUntil, setValidUntil] = useState(0);
  function daysToSeconds(days: number) {
    const currentDate = new Date(); // Current date and time
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
    return unixTimestamp + days * 24 * 60 * 60;
  }

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "PendulumFactory",
    functionName: "createPendulum",
    gas: 10_000_000n,
    args: [
      topicName,
      tokenSymbol,
      "",
      BigInt(ethers.parseEther(auctionStartingPrice.toString()) || 0),
      BigInt(ethers.parseEther(auctionMinBidStep.toString()) || 0),
      BigInt(daysToSeconds(auctionMinDuration) || 0),
      beneficiary,
      BigInt(daysToSeconds(validUntil) || 0),
    ],
    //args: ["Account Abstraction", "AA", "", 1000000, 1000, 300, 400, beneficiary],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  return (
    <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* HEADING */}
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">Create New Pendulum</h2>
        <span className="block mt-3 text-neutral-400">
          You can set preferred display name, create your profile URL and manage other personal settings.
        </span>
      </div>
      <hr className="w-full border-t-2 border-neutral-700" />
      <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
        <FormItem label="Pendulum Question">
          <Input placeholder="Account Abstraction" onChange={e => setTopicName(e.target.value)} />
        </FormItem>
        <FormItem label="Question Type">
          <Input placeholder="Business" onChange={e => setTokenSymbol(e.target.value)} />
        </FormItem>

        <FormItem label="Auction Starting Price">
          <Input placeholder="0.1" onChange={e => setAuctionStartingPrice(e.target.value)} type="number" />
        </FormItem>

        <FormItem label="Auction Min Bid Increase">
          <Input placeholder="0.05" onChange={e => setAuctionMinBidStep(e.target.value)} type="number" />
        </FormItem>

        <FormItem label="Auction Duration (In Days)">
          <Input placeholder="3" onChange={e => setAuctionMinDuration(e.target.value)} type="number" />
        </FormItem>

        <FormItem label="Creator Address">
          <Input
            placeholder="0x5621b3d8C7F87E833430ed5c9Ff1896630821139"
            onChange={e => setBeneficiary(e.target.value)}
          />
        </FormItem>

        <FormItem label="Auction Duration (In Days)">
          <Input placeholder="30" onChange={e => setValidUntil(e.target.value)} type="number" />
        </FormItem>

        <Button type="submit" className={`${isLoading ? "loading" : ""}`} onClick={() => writeAsync()}>
          {!isLoading && <>Create Pendulum</>}
        </Button>
      </div>
    </div>
  );
};
