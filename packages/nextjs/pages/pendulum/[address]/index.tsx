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
          <div>
            <PendulumPageCard address={address}></PendulumPageCard>
            <UpdatePendulum address={address}></UpdatePendulum>
          </div>
        ) : (
          <p>Invalid address</p> // Handle the case when address is undefined or an array
        )}
      </div>
    </div>
  );
}
