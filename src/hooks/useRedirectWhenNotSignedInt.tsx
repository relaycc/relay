import { useRouter } from "next/router";
import { useConnectedWallet } from "./useConnectedWallet";
import { useXmtpClient, EthAddress } from "@relaycc/xmtp-hooks";

export const useRedirectWhenNotSignedIn = (redirectTo: string) => {
  const router = useRouter();
  const { connectedWallet } = useConnectedWallet();
  const xmtpClient = useXmtpClient({
    clientAddress: connectedWallet?.address as EthAddress,
  });

  if (
    xmtpClient.data === undefined ||
    xmtpClient.data === null ||
    xmtpClient.data.address() !== connectedWallet?.address
  ) {
    router.push("/receiver/sign?redirect=" + redirectTo);
  }
};
