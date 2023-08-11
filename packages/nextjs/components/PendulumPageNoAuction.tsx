import { useState } from "react";
import Button from "./Button";
import FormItem from "./Forms/FormItem";
import Input from "./Forms/Input";
import { ethers } from "ethers";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { secondsToDhms } from "~~/utils/pendulumUtis";

interface DataComponentProps {
  label: string;
  textLabel: string;
  align: string;
}

const DataComponent = ({ label, textLabel, align }: DataComponentProps) => {
  const labelClass = `text-slate-400 text-lg ${align} m-0`;
  const textClass = `text-slate-50 text-2xl ${align} m-0`;
  return (
    <div className="flex flex-col justify-start">
      <h4 className={labelClass}>{label}</h4>
      <h2 className={textClass}>{textLabel}</h2>
    </div>
  );
};

const ResponseCard = () => {
  return (
    <div className="flex flex-col w-full mb-16">
      <div className="flex items-start">
        <img src="https://via.placeholder.com/48" alt="User Profile" className="w-12 h-12 rounded-full mr-2" />
        <div className="flex flex-col justify-center">
          <div className="flex items-center mb-1">
            <h3 className="text-lg font-semibold m-0">John Doe</h3>
            <p className="text-gray-500 m-0 ml-1">August 10, 2023</p>
          </div>
        </div>
      </div>

      <p className="block text-left">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe laboriosam corporis numquam pariatur optio
        quasi, fuga repellat repellendus provident facere dolorem tenetur. Maiores asperiores neque, a quasi in
        voluptatem consequuntur.
      </p>

      <div className="flex w-full ml-4 mt-6">
        <div className="flex m-0">
          <h2 className="text-purple-500 mr-8">Alive.eth</h2>
          <h2>August 12, 2013</h2>
        </div>
      </div>
      <p className="block text-left ml-4">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis sapiente consectetur aperiam voluptatibus
        magnam ea ipsum impedit veritatis totam ex. Ad optio exercitationem alias eaque velit quaerat minima voluptatem
        veniam?
      </p>
    </div>
  );
};

export const PendulumPageNoAuction = ({ address }: { address?: string }) => {
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

  const { data: price } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "price",
    address,
  });

  const { data: tax } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "tax",
    address,
  });

  const { data: validUntil } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "validUntil",
    address,
  });

  function getPrice() {
    return ethers.formatEther(price ? price.toString() : "0");
  }

  function feePerWeek() {
    const t = tax ? Number(tax) / 100 : 1;
    return Number(getPrice()) * t;
  }

  return (
    <div className="w-full h-screen mb-12 mt-12">
      <div className="w-10/12 flex justify-between items-start m-auto">
        <div className="flex flex-col w-full mr-8 rounded-lg justify-center text-center h-full">
          <h4 className="text-xl text-slate-400 m-0"> Ask me about </h4>
          <h1 className="text-4xl"> Account Abstraction </h1>
          <div className="flex flex-col justify-between p-8">
            <div className="flex justify-between">
              <DataComponent label="Current Price" textLabel={getPrice() + " ETH"} align="text-left"></DataComponent>
              <DataComponent
                label="Current Fee/wk"
                textLabel={feePerWeek() + " ETH"}
                align="text-right"
              ></DataComponent>
            </div>
            <div className="flex justify-between mt-8">
              <DataComponent label="Pendulum Stops" textLabel="6 days" align="text-left"></DataComponent>
              <DataComponent
                label="Pendulum Breaks"
                textLabel={secondsToDhms(Number(validUntil) / 1000)}
                align="text-right"
              ></DataComponent>
            </div>
          </div>
          <div className="flex flex-col py-8 px-8 bg-purple-600 rounded-lg m-8">
            <h3 className="text-3xl mb-6">Set New Price</h3>
            <h4 className="text-lg text-stone-300">
              New fee per week <span className="text-slate-50 font-semibold">$25</span>
            </h4>
            <FormItem label="" className="my-4">
              <Input placeholder="$50"></Input>
            </FormItem>
            <Button type="submit" onClick={() => writeAsync()}>
              <span className="text-xl font-semibold">Set</span>
            </Button>
          </div>

          <div className="flex flex-col py-8 px-8 bg-purple-600 rounded-lg m-8">
            <h3 className="text-3xl mb-6">Recharge Pendulum</h3>
            <h4 className="text-lg text-stone-300">
              Total Fee <span className="text-slate-50 font-semibold">$25</span>
            </h4>
            <FormItem label="" className="my-4">
              <Input placeholder="1"></Input>
            </FormItem>
            <Button>
              <span className="text-xl font-semibold">Recharge</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full ml-8 rounded-lg justify-center text-center h-full">
          <h4 className="text-xl text-slate-400 m-0"> </h4>
          <h1 className="text-4xl mb-8"> Past Responses </h1>
          <div className="p-10 rounded-lg bg-gray-300 bg-opacity-30 w-full h-screen flex flex-col justify-between items-center">
            <div className="flex flex-col t-0 h-3/4 overflow-y-auto mb-4" id="responses">
              <ResponseCard></ResponseCard>
              <ResponseCard></ResponseCard>
              <ResponseCard></ResponseCard>
              <ResponseCard></ResponseCard>
              <ResponseCard></ResponseCard>
              <ResponseCard></ResponseCard>
            </div>
            <div className="flex flex-col w-full" id="ask">
              <FormItem label="" className="mb-4">
                <Input
                  placeholder="Input your question here"
                  sizeClass="h-48 px-4 py-3 align-text-top"
                  fontClass="text-lg font-normal"
                ></Input>
              </FormItem>
              <Button> Ask Question </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
