import { useState } from "react";
import Button from "./Button";
import FormItem from "./Forms/FormItem";
import Input from "./Forms/Input";
import { ethers } from "ethers";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export default function SetNewPriceCard({ address }: { address?: string }) {
  const [newPrice, setNewPrice] = useState(0);
  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Pendulum",
    functionName: "setPrice",
    args: [ethers.parseEther(String(newPrice))],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
    address: address,
  });

  return (
    <div className="flex flex-col py-8 px-8 bg-purple-600 rounded-2xl m-8 ">
      <h3 className="text-3xl mb-6">Set New Price</h3>
      <h4 className="text-lg text-stone-300">
        New fee per week <span className="text-slate-50 font-semibold">$25</span>
      </h4>
      <FormItem label="" className="my-4">
        <Input placeholder="$50" onChange={e => setNewPrice(e.target.value)}></Input>
      </FormItem>
      <Button type="submit" onClick={() => writeAsync()}>
        <span className="text-xl font-semibold">Set</span>
      </Button>
    </div>
  );
}
