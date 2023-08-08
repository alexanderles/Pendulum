import { useState } from "react";
import Button from "../Button";
import FormItem from "../Forms/FormItem";
import Input from "../Forms/Input";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const UpdatePendulum = ({ address }: { address?: string }) => {
  const [newStartingPrice, setNewStartingPrice] = useState(1);
  const [newMinBidStep, setNewMinBidStep] = useState(2);
  const [newMinDuration, setNewMinDuration] = useState(3);
  const [newBidExtension, setNewBidExtension] = useState(4);

  function daysToSeconds(days: number) {
    return days * 24 * 60 * 60;
  }

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Pendulum",
    functionName: "setAuctionParameters",
    args: [
      ethers.parseEther(String(newStartingPrice)),
      ethers.parseEther(String(newMinBidStep)),
      BigInt(newMinDuration),
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
    address: address,
  });

  // USING ETHERS FOR CALL

  return (
    <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
      {/* HEADING */}
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">Update Created Pendulum</h2>
        <span className="block mt-3 text-neutral-400">
          You can set preferred display name, create your profile URL and manage other personal settings.
        </span>
      </div>
      <hr className="w-full border-t-2 border-neutral-700" />
      <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
        <FormItem label="New Starting Price">
          <Input placeholder="0.5" onChange={e => setNewStartingPrice(e.target.value)} />
        </FormItem>
        <FormItem label="New Min Bid Step">
          <Input placeholder="0.6" onChange={e => setNewMinBidStep(e.target.value)} />
        </FormItem>

        <FormItem label="New Min Duration">
          <Input placeholder="11" onChange={e => setNewMinDuration(e.target.value)} />
        </FormItem>

        <FormItem label="New Bid Extension">
          <Input placeholder="20" onChange={e => setNewBidExtension(e.target.value)} />
        </FormItem>

        <Button type="submit" className={`${isLoading ? "loading" : ""}`} onClick={() => writeAsync()}>
          {!isLoading && <>Update Pendulum</>}
        </Button>
      </div>
    </div>
  );
};
