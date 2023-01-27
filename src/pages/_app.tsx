import "styles/globals.css";
import React, { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createClient, chain } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import "@rainbow-me/rainbowkit/styles.css";
import { Provider } from "@relaycc/receiver";
import { Provider as PlausibleProvider } from "../lib";

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
    <PlausibleProvider>
      <Head>
        <title>Relay</title>
        <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
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
    </PlausibleProvider>
  );
}

export default MyApp;
