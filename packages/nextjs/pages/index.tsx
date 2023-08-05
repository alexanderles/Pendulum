import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import * as THREE from "three";
import HALO from "vanta/dist/vanta.halo.min.js";
import { MetaHeader } from "~~/components/MetaHeader";
import { HaloInstance, HaloParams } from "~~/vanta";

const Home: NextPage = () => {
  const [vantaEffect, setVantaEffect] = useState<HaloInstance | undefined>(undefined);
  const vantaRef = useRef(null);
  useEffect(() => {
    // if (!vantaEffect) {
    //   const effectInstance: HaloInstance = window.VANTA.HALO({
    //     el: vantaRef.current,
    //     mouseControls: true,
    //     touchControls: true,
    //     gyroControls: false,
    //     minHeight: 200.0,
    //     minWidth: 200.0,
    //     amplitudeFactor: 0.8,
    //     xOffset: 0.16,
    //   });
    //   setVantaEffect(effectInstance);
    // }
    // return () => {
    //   if (vantaEffect) vantaEffect.destroy();
    // };
  }, [vantaEffect]);
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10" ref={vantaRef}></div>
    </>
  );
};

export default Home;
