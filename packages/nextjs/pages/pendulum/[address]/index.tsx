import { useRouter } from "next/router";
import { isAddress } from "viem";
import { PendulumPageCard } from "~~/components/readChain/readPendulum";
import { UpdatePendulum } from "~~/components/writeChain/UpdatePendulum";

export default function Pendulum({ params }: any) {
  const router = useRouter();
  const address = router.query.address;
  return (
    <div>
      <div>
        {typeof address === "string" && isAddress(address) ? ( // Check if address is a valid string
          <PendulumPageCard address={address}></PendulumPageCard>
        ) : (
          <p>Invalid address</p> // Handle the case when address is undefined or an array
        )}
      </div>
      <UpdatePendulum></UpdatePendulum>
    </div>
  );
}
