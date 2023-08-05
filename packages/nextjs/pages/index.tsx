import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min";
import Button from "~~/components/Button";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(0);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        HALO({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          amplitudeFactor: 2.4,
          xOffset: 0.18,
          size: 0.8,
          THREE: THREE,
        }),
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow pt-10 justify-center" ref={myRef}>
        {/* <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-36 xl:pb-60 xl:pr-14 lg:mr-10 xl:mr-0"> */}
        <div className="flex-shrink-0 flex flex-col items-start lg:w-1/2 space-y-8 w-1/2 ml-64">
          <h2 className="font-semibold text-4xl md:text-5xl xl:text-6xl">
            Grow with Expert's <br />
            <span>Pendulums</span>
          </h2>
          <span className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            Discover the experts in all topics of life <br /> Ask them questions with their pendulums
          </span>
          <Button href="/search">
            <span>Find Expert</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;
