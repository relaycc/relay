import { useRouter } from "next/router";
import { useConnectedWallet } from "./useConnectedWallet";
import { useXmtpClient } from "@relaycc/xmtp-hooks";
import { EthAddress } from "@relaycc/xmtp-hooks";

export const useRedirectWhenSignedIn = () => {
  const router = useRouter();
  const redirect = router.query.redirect;
  const { connectedWallet } = useConnectedWallet();
  const xmtpClient = useXmtpClient({
    clientAddress: connectedWallet?.address as EthAddress,
  });

  console.log("redirect", redirect);

  if (typeof redirect !== "string") {
    ("whattttttttt");
    return;
  } else {
    console.log("xmtpClient.data", xmtpClient.data);
    console.log("xmtpClient.dataaddress", xmtpClient.data?.address());
    console.log("connectedWallet?.address", connectedWallet?.address);
    if (
      xmtpClient.data !== undefined &&
      xmtpClient.data !== null &&
      xmtpClient.data.address() === connectedWallet?.address
    ) {
      console.log("redirecting");
      router.push(redirect);
    }
  }
};
