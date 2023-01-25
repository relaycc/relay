import { useRouter } from "next/router";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { EthAddress, useDirectMessage } from "@relaycc/xmtp-hooks";
import { useXmtpClient } from "@relaycc/xmtp-hooks";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import { getAddress } from "@ethersproject/address";

export default function Messages() {
  const router = useRouter();
  const peerAddress = router.query.address as EthAddress;
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const xmtpClient = useXmtpClient({
    clientAddress: connectedWallet?.address as EthAddress,
  });
  const myAddress = connectedWallet?.address.toLowerCase() as EthAddress;
  const { messages, sendMessage } = useDirectMessage({
    clientAddress: connectedWallet?.address as EthAddress,
    conversation: { peerAddress:"0x3AE8348229C8fd6EEAa0CB718AfEc166DFB4FE17" },
  });
  useRedirectWhenNotSignedIn("/receiver/messages");
  return (
    <main>
      <h1>Messages</h1>
      <h2>Client Address</h2>
      <p>{`${xmtpClient.data?.address()}`}</p>
      <h2>Is Waiting</h2>
      <p>{`${messages.isWaiting}`}</p>
      <h2>Is Loading</h2>
      <p>{`${messages.isLoading}`}</p>
      <h2>Is Error</h2>
      <p>{`${messages.isError}`}</p>
      <h2>Is Success</h2>
      <p>{`${messages.isSuccess}`}</p>
      <h2>Num Messgaes</h2>
      <p>{`${(messages.data || []).length}`}</p>

      <ol>
        {(messages.data || []).map((m, i) => {
          return <li key={m.id}>{`${m.content}`}</li>;
        })}
      </ol>
    </main>
  );
}
