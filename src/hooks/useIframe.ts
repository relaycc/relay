import { useEffect, useCallback, useState } from "react";
import * as Comlink from "comlink";
import { shallow } from "zustand/shallow";
import { useIframeStore } from "./useIframeStore";
import { Signer } from "ethers";

interface IRemoteActions {
  connect: () => unknown;
  isConnected: (
    callback: (isConnected: boolean) => unknown
  ) => Promise<boolean>;
  sign: (
    message: string,
    callback: (sig: string) => unknown
  ) => Promise<string>;
  xmtp: (cb: (wallet: Signer) => unknown) => Promise<any>;
  fSigner: (cb: (signer: Signer) => unknown) => Promise<any>;
}

let init = false;
let init2 = false;

export const useIframe = () => {
  const { updateIsConnected, updateAddress, updateSigner } = useIframeStore(
    (state) => ({
      updateIsConnected: state.updateIsConnected,
      updateAddress: state.updateAddress,
      updateSigner: state.updateSigner,
      signer: state.signer,
    })
  );

  const [actions, setActions] = useState<IRemoteActions | null>(null);
  const [sig, setSig] = useState<string | null>(null);

  useEffect(() => {
    if (init) {
      return;
    } else {
      init = true;
      setActions(() => {
        return Comlink.wrap<IRemoteActions>(
          Comlink.windowEndpoint(window.parent)
        );
      });
    }
  }, []);

  useEffect(() => {
    if (init2) {
      return;
    } else {
      init2 = true;
      Comlink.expose(
        {
          con: (isConnected: boolean, address: string, signer: any) => {
            updateIsConnected(isConnected);
            updateAddress(address);
            updateSigner(signer);
          },
        },
        Comlink.windowEndpoint(window)
      );
    }
  }, []);

  const handleConnect = useCallback(() => {
    if (!actions) {
      return;
    }
    actions.connect();
  }, [actions]);

  // const handleXmtp = useCallback(
  //   (
  //     signIn: ({
  //       wallet,
  //       opts,
  //     }: {
  //       wallet: Signer;
  //       opts: { env: string };
  //     }) => void
  //   ) => {
  //     console.log("enabling xmtp", { actions, signIn });
  //     if (!actions) {
  //       return;
  //     }
  //     actions.xmtp(
  //       Comlink.proxy((wallet: Signer) => {
  //         console.log("signing in");
  //         signIn({ wallet, opts: { env: "production" } });
  //       })
  //     );
  //   },
  //   [actions]
  // );

  // const handleSignMessage = useCallback(
  //   (message: string) => {
  //     if (!actions) {
  //       return;
  //     }
  //     actions.sign(message, (sig) => {
  //       setSig(sig);
  //     });
  //   },
  //   [actions]
  // );

  return {
    handleConnect,
  };
};
