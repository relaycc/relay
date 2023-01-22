import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { SiweMessage } from "siwe";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Header } from "@/components/Header";
import { useRemoteConnect } from "@/lib/receiver/useRemoteConnect";
import { useRemoteNetwork } from "@/lib/receiver/useRemoteNetwork";
import { useRemoteSigner } from "@/lib/receiver/useRemoteSigner";
import { Signer } from "ethers";
import { useListen } from "@/lib/comlink/useListen";
import { usePush } from "@/lib/comlink/usePush";

export default function Siwe() {
  // const { signMessageAsync } = useSignMessage();
  // const { chain } = useNetwork();
  // const { address, isConnected } = useAccount();
  // const { connect } = useConnect({
  //   connector: new InjectedConnector(),
  // });
  const [target, setTarget] = useState<Window | null>(null);
  useEffect(() => {
    setTarget(window.parent);
  }, []);

  // const address = useAddress(signer);
  const network = useRemoteNetwork(target);
  const connect = useRemoteConnect(target);
  const signer = useRemoteSigner(target);
  // const { data: session, status } = useSession();
  // const [n, setN] = useState<number>(0);
  // usePush("rest", n, target);
  // useEffect(() => {
  //   setInterval(() => {
  //     setN(n + 1 + 2);
  //   }, 1000);
  // });
  // const t = useListen("test", target);
  // console.log("test", t);

  // const handleLogin = async () => {
  //   if (signMessage === null || network === null) {
  //     return;
  //   }
  //   try {
  //     const callbackUrl = "/protected";
  //     const message = new SiweMessage({
  //       domain: window.location.host,
  //       address: await signer.getAddress(),
  //       statement: "Sign in with Ethereum to the app.",
  //       uri: window.location.origin,
  //       version: "1",
  //       chainId: network.id,
  //       nonce: await getCsrfToken(),
  //     });
  //     const signature = await signer.signMessage(message.prepareMessage());
  //     signIn("credentials", {
  //       message: JSON.stringify(message),
  //       redirect: false,
  //       signature,
  //       callbackUrl,
  //     });
  //   } catch (error) {
  //     window.alert(error);
  //   }
  // };
  // return (
  //   <main style={{ padding: "6rem" }}>
  //     <ConnectButton />
  //     <Header />
  //     <h1>Address</h1>
  //     <p>{address}</p>
  //   </main>
  // );
  return (
    <>
      <button
        onClick={() => {
          console.log("connect is", connect);
          connect && connect();
        }}
      >
        Connect
      </button>
      <button
        onClick={() => {
          console.log("signer is", signer);
          signer && signer.signMessage("test");
        }}
      >
        Sign
      </button>
      <h1>Network</h1>
      <p>{`${network && network.id}`}</p>
    </>
  );
}
// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
