import { useEffect, useState } from "react";
import { GlobalStyles } from "@/components/GlobalStyles";
import type { AppProps } from "next/app";
import { ReceiverThemeProvider } from "@/lib/design/wip/ReceiverThemeProvider";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { XmtpProvider } from "@relaycc/xmtp-hooks";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const client = createClient({
  autoConnect: false,
  provider,
  connectors,
});

export default function App({
  Component,
  pageProps,
}: AppProps<{ session: Session }>) {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    setWorker(new Worker("/xmtp.js"));
  }, []);
  return (
    <ReceiverThemeProvider>
      <WagmiConfig client={client}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <RainbowKitProvider chains={chains}>
            <GlobalStyles />
            {(() => {
              if (worker === null) {
                return null;
              } else {
                return (
                  <XmtpProvider config={{ worker: worker as Worker }}>
                    <Component {...pageProps} />
                  </XmtpProvider>
                );
              }
            })()}
          </RainbowKitProvider>
        </SessionProvider>
      </WagmiConfig>
    </ReceiverThemeProvider>
  );
}
