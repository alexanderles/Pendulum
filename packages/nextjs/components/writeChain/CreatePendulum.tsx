"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../Button";
import FormItem from "../Forms/FormItem";
import Input from "../Forms/Input";
import axios from "axios";
import { ethers } from "ethers";
import { toast } from "react-hot-toast";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const CreatePendulum = () => {
  const router = useRouter();

  const [topicName, setTopicName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [auctionStartingPrice, setAuctionStartingPrice] = useState(0);
  const [auctionMinBidStep, setAuctionMinBidStep] = useState(0);
  const [auctionMinDuration, setAuctionMinDuration] = useState(0);
  const [beneficiary, setBeneficiary] = useState("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
  const [validUntil, setValidUntil] = useState(0);
  const [questionFrequency, setQuestionFrequency] = useState(0);
  const [tax, setTax] = useState(0);
  const [saleRoyalty, setSaleRoyalty] = useState(0);

  const [pendulum, setPendulum] = useState({
    name: "",
    count: 0,
    pendulumAddr: "",
  });
  const [loading, setLoading] = React.useState(false);

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
      BigInt(daysToSeconds(questionFrequency) || 0),
      BigInt((tax * 100).toString() || 0),
      BigInt((saleRoyalty * 100).toString() || 0),
    ],
    //args: ["Account Abstraction", "AA", "", 1000000, 1000, 300, 400, beneficiary],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
  });

  const onPendulumCreated = async () => {
    console.log("on created...");
    if (!(pendulum.name && pendulum.count && pendulum.pendulumAddr)) {
      console.log("error: one or more pendulum fields not set");
      return;
    }

    try {
      console.log("pendulum: ", pendulum);
      const response = await axios.post("/api/pendulums/creation", pendulum);
      console.log("Signup success: ", response.data);
      router.push(`/pendulums/${pendulum.pendulumAddr}`);
    } catch (error: any) {
      console.log("Signup failed: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useScaffoldEventSubscriber({
    contractName: "PendulumFactory",
    eventName: "Creation",
    listener: logs => {
      logs.map(log => {
        const { name, count, pendulumAddr } = log.args;
        console.log("📡 Pendulum Creation event", name, count, pendulumAddr);

        setPendulum({
          name: name ? name : "",
          count: count ? Number(count) : 0,
          pendulumAddr: pendulumAddr ? pendulumAddr : "",
        });

        console.log("pendulum set");
        console.log(pendulum.name);
        console.log(pendulum.count);
        console.log(pendulum.pendulumAddr);

        onPendulumCreated();
      });
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

        <FormItem label="Pendulum Validity">
          <Input placeholder="30" onChange={e => setValidUntil(e.target.value)} type="number" />
        </FormItem>

        <FormItem label="Question frequency">
          <Input placeholder="7" onChange={e => setQuestionFrequency(e.target.value)} type="number" />
        </FormItem>

        <FormItem label="Weekly Recharge Fee">
          <Input placeholder="5" onChange={e => setTax(e.target.value)} type="number" />
        </FormItem>

        <FormItem label="Secondary sale royalty">
          <Input placeholder="10" onChange={e => setSaleRoyalty(e.target.value)} type="number" />
        </FormItem>

        <Button type="submit" className={`${isLoading ? "loading" : ""}`} onClick={() => writeAsync()}>
          {!isLoading && <>Create Pendulum</>}
        </Button>
      </div>
    </div>
  );
};
