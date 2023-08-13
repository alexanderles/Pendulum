import { useRouter } from "next/router";
import { isAddress } from "viem";
import { ExpertPendulumPage } from "~~/components/ExpertPendulumPage";

export default function Pendulum({ params }: any) {
  const router = useRouter();
  const address = router.query.address;
  const questionId = router.query.questionId;

  return (
    <div>
      {typeof address === "string" && isAddress(address) && typeof questionId === "string" ? (
        <ExpertPendulumPage address={address} questionId={questionId} />
      ) : (
        <div>Invalid address</div>
      )}
    </div>
  );
}
