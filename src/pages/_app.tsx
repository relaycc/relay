import "styles/globals.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createClient, chain } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import Head from "next/head";
// TODO(achilles@relay.cc) For some reason rainbowkit css import wasn't working,
// remove this hack soon.
// import "../styles/rainbowkit.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "@relaycc/receiver";

const alchemyKey = "kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.goerli,
    chain.sepolia,
    chain.optimism,
    chain.optimismGoerli,
    chain.polygon,
    chain.polygonMumbai,
    chain.arbitrum,
  ],
  [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Relay Receiver Example App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setWorker(new Worker("/XmtpWorker.js"));
  }, []);

  return (
    <>
      <Head>
        <title>Relay</title>
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          {(() => {
            if (worker === null) {
              return null;
            } else {
              return (
                <Provider config={{ worker: worker as Worker }}>
                  <Component {...pageProps} />
                </Provider>
              );
            }
          })()}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
