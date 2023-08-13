import { ReactNode, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { SessionProvider, useSession } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { useDarkMode } from "usehooks-ts";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";
import type { NextComponentType  } from 'next' //Import Component type

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & {auth?: boolean} // add auth type
}

const ScaffoldEthApp = ({ Component, pageProps: { session, ...pageProps } }: CustomAppProps) => {
  // This variable is required for initial client side rendering of correct theme for RainbowKit
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    setIsDarkTheme(isDarkMode);
    const body = document.body;
    body.setAttribute("data-theme", "scaffoldEthDark");
  }, [isDarkMode]);

  return (
    <SessionProvider session={session}>
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar} theme={darkTheme()}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="relative flex flex-col flex-1">
              {Component.auth ? (
                <Auth>
                  <Component {...pageProps} />
                </Auth>
              ) : (
                <Component {...pageProps} />
              )}
            </main>
            <Footer />
          </div>
          <Toaster />
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  );
};

function Auth({ children }: {children: ReactNode}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const loading = status === "loading";

  useEffect(() => {
    if (!loading) {
      if (!isUser) {
        router.push("/login");
      }
    }
  }, [isUser, loading]);

  if (loading) {
    return <h3>Loading...</h3>
  }

  if (!loading && isUser) {
    return <>{children}</>;
  }

  return null;
}

export default ScaffoldEthApp;
