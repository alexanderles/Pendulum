import { ImgHTMLAttributes, useMemo } from "react";
import { useRouter } from "next/router";
import { BigNumberish, ethers } from "ethers";
import { minidenticon } from "minidenticons";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import { formatEthereumAddress } from "~~/utils/pendulumUtis";
import { secondsToDhms } from "~~/utils/pendulumUtis";

export const PendulumThumbnail = ({ address }: { address?: string }) => {
  const router = useRouter();

  interface IdentityIconProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
    username: string;
    saturation?: string | number;
    lightness?: string | number;
  }

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

  const { data: minimumBid } = useScaffoldContractRead({
    contractName: "Pendulum",
    functionName: "minimumBid",
    address,
  });

  const getAddress = formatEthereumAddress(address);

  const MinidenticonImg: React.FC<IdentityIconProps> = ({ username, saturation, lightness, ...props }) => {
    const svgURI = useMemo(
      () => "data:image/svg+xml;utf8," + encodeURIComponent(minidenticon(username, saturation, lightness)),
      [username, saturation, lightness],
    );
    return <img src={svgURI} alt={username} {...props} />;
  };

  const handlePendulumOnClick = () => {
    router.push("/pendulum/[address]", `/pendulum/${address}`);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw]">
      <div className="hover:cursor-pointer relative rounded-2xl shadow-lg w-72" onClick={handlePendulumOnClick}>
        <img src="/purple-gradient-1.jpg" alt="NFT Title" className="object-cover rounded-2xl h-56" />
        <div className="absolute top-0 left-0 p-2 rounded-tl-lg">
          <div className="flex w-full justify-left items-center">
            <div className="flex relative w-10 h-10 mr-2">
              <MinidenticonImg
                username={address ? address : "Default"}
                saturation="90"
                width="150"
                height="150"
                className="rounded-full"
              />
            </div>
            <div>{getAddress}</div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 p-2 pr-3 pl-3 bg-slate-100 text-stone-800 font-sans font-semibold rounded-tr-xl rounded-bl-2xl rounded-br-2xl rounded-tl-none translate-y-8">
          <div className=" mb-2">{pendulumName}</div>

          <div className="flex">
            <div className="flex flex-col mr-8">
              <span className="text-stone-500 font-normal">Min Bid</span>
              <span className="text-green-600"> {ethers.formatEther(minimumBid?.toString())} ETH</span>
            </div>
            <div className="self-end ml-4">
              <span className="text-stone-500 font-normal">Base:</span>
              <span className="text-green-600"> {ethers.formatEther(auctionStartingPrice?.toString())} ETH</span>
            </div>
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
              <p className="mb-0 mt-1">{secondsToDhms(Number(validUntil))}</p>
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
