import { GlobalStyles } from "@/components/GlobalStyles";
import type { AppProps } from "next/app";
import { ReceiverThemeProvider } from "@/lib/design/wip/ReceiverThemeProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReceiverThemeProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ReceiverThemeProvider>
  );
}
