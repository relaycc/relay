import { useEffect, useState } from "react";
import { GlobalStyles } from "@/components/GlobalStyles";
import type { AppProps } from "next/app";
import { ReceiverThemeProvider } from "@/design/ReceiverThemeProvider";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { XmtpProvider } from "@relaycc/xmtp-hooks";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PlausibleProvider } from "@/lib/plausible/PlausibleProvider";
import { LensConfig, staging } from "@lens-protocol/react";
import { bindings } from "@lens-protocol/wagmi";
import { localStorage } from "@lens-protocol/react/web";
import { LensProvider } from "@lens-protocol/react";

export const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const client = createClient({
  autoConnect: true,
  provider,
  connectors,
});
const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: staging,
  storage: localStorage(),
};
export default function App({ Component, pageProps }: AppProps) {
  const [worker, setWorker] = useState<Worker | null>(null);
  // const [lazyImports, setLazyImports] = useState();
  // const staging = import("@lens-protocol/react").then((lens) => {
  //   return lens.staging;
  // });
  // const bindings = import("@lens-protocol/wagmi").then((wagmi) => {
  //   return wagmi.bindings;
  // });
  // const localStorage = import("@lens-protocol/react/web").then((web) => {
  //   return web.localStorage;
  // });
  const value = Promise.all([
    import("@lens-protocol/react").then((lens) => {
      return lens.staging;
    }),
    import("@lens-protocol/wagmi").then((wagmi) => {
      return wagmi.bindings;
    }),
    import("@lens-protocol/react/web").then((web) => {
      return web.localStorage;
    }),
  ]).then((values) => {
    const staging = values[0];
    const bindings = values[1];
    const localStorage = values[2];
    // console.log({ staging, bindings, localStorage });
    const lensConfig: LensConfig = {
      bindings: bindings(),
      environment: staging,
      storage: localStorage(),
    };
    console.log({ lensConfig });
  });
  useEffect(() => {
    // if (value.state === "fulfilled") console.log({ value });
    console.log({ value });
  }, [value]);
  useEffect(() => {
    setWorker(new Worker("/xmtp.js"));
  }, []);
  return (
    <PlausibleProvider>
      <ReceiverThemeProvider>
        <WagmiConfig client={client}>
          <LensProvider config={lensConfig}>
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
          </LensProvider>
        </WagmiConfig>
      </ReceiverThemeProvider>
    </PlausibleProvider>
  );
}
