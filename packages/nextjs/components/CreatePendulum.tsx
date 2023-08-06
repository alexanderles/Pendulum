import { useState } from "react";
import Button from "./Button";
import FormItem from "./Forms/FormItem";
import Input from "./Forms/Input";
import { EventDispatcher } from "three";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const CreatePendulum = () => {
  const [topicName, setTopicName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Pendulum",
    functionName: "initialize",
    args: [topicName, tokenSymbol],
    // value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log("Topic name: ", topicName);
      console.log("Token symbol: ", tokenSymbol);
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
        <FormItem label="Pendulum Topic">
          <Input placeholder="Account Abstraction" onChange={e => setTopicName(e.target.value)}/>
        </FormItem>
        <FormItem label="Symbol">
          <Input placeholder="NFT" onChange={e => setTokenSymbol(e.target.value)} />
        </FormItem>
        <Button type="submit" className={`${isLoading ? "loading" : ""}`} onClick={() => writeAsync()}>
          {!isLoading && <>Create Pendulum</>}
        </Button>
      </div>
    </div>
  );
};
