import "styles/globals.css";
import type { AppProps } from "next/app";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useSetWallet } from "@relaycc/receiver";
import {
  WagmiConfig,
  configureChains,
  createClient,
  defaultChains,
} from "wagmi";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
// TODO(achilles@relay.cc) For some reason rainbowkit css import wasn't working,
// remove this hack soon.
import "../styles/rainbowkit.css";

const alchemyKey = "kmMb00nhQ0SWModX6lJLjXy_pVtiQnjx";

const { chains, provider } = configureChains(defaultChains, [
  alchemyProvider({ apiKey: alchemyKey }),
  publicProvider(),
]);

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
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
