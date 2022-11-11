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
import "../styles/rainbowkit.css";
import { Receiver } from "@relaycc/receiver";
import { XmtpWorkerClient } from "@relaycc/xmtp-worker";

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
  const [client, setClient] = useState<XmtpWorkerClient | null>(null);

  useEffect(() => {
    setClient(
      new XmtpWorkerClient(
        new Worker(new URL("../utils/XmtpWorker.js", import.meta.url))
      )
    );
  }, []);

  return (
    <>
      <Head>
        <title>Relay</title>
        <meta name="desctiption" content="Relay is the web3 crossroads. Decentralized, secure, and private identity and messaging." />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Receiver
            config={
              client === null ? null : { xmtp: { network: "dev", client } }
            }
          >
            <Component {...pageProps} />
          </Receiver>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
