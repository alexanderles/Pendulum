import { useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { isAddress } from "viem";
import Button from "~~/components/Button";
import FormItem from "~~/components/Forms/FormItem";
import Input from "~~/components/Forms/Input";
import { PendulumThumbnail } from "~~/components/readChain/pendulumThumbnail";
import { UpdatePendulum } from "~~/components/writeChain/UpdatePendulum";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";

export default function Pendulum({ params }: any) {
  const router = useRouter();
  const address = router.query.address;
  const [amount, setAmount] = useState("0");
  const [price, setPrice] = useState("0");

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

  const { data: minimumBid } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "leadingBid",
    address,
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "Pendulum",
    functionName: "bid",
    args: [BigInt(ethers.parseEther(amount.toString())), ethers.parseEther("2")],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      console.log(txnReceipt);
    },
    address: address,
    value: `${Number(amount)}`,
  });

  function getMinBid() {
    if (minimumBid) {
      return ethers.formatEther(String(minimumBid)).toString();
    } else {
      return "0.1";
    }
  }

  return (
    <div className="flex align-center w-full">
      {typeof address === "string" && isAddress(address) ? ( // Check if address is a valid string
        <div className="flex items-center">
          <PendulumThumbnail address={address}></PendulumThumbnail>
          <div className="flex container">
            <FormItem label="Enter bid Value">
              <Input placeholder={getMinBid()} type="tel" onChange={e => setAmount(e.target.value)}></Input>
              <Button onClick={() => writeAsync()}> Bid </Button>
            </FormItem>
          </div>
          {/* <UpdatePendulum address={address}></UpdatePendulum> */}
        </div>
      ) : (
        <p>Invalid address</p> // Handle the case when address is undefined or an array
      )}
    </div>
  );
}
