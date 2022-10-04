import "styles/globals.css";
import type { AppProps } from "next/app";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useSetWallet } from "@relaycc/receiver";
import { WagmiConfig, configureChains, createClient, chain } from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
// TODO(achilles@relay.cc) For some reason rainbowkit css import wasn't working,
// remove this hack soon.
import "../styles/rainbowkit.css";

const alchemyKey = "kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx";

const { chains, provider } = configureChains(
  [
    chain.mainnet,
    chain.ropsten,
    chain.rinkeby,
    chain.goerli,
    chain.kovan,
    chain.sepolia,
    chain.optimism,
    chain.optimismGoerli,
    chain.optimismKovan,
    chain.polygon,
    chain.polygonMumbai,
    chain.arbitrum,
    chain.arbitrumRinkeby,
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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
