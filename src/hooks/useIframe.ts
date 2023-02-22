import { useEffect, useCallback, useState } from "react";
import * as Comlink from "comlink";
import { useIframeStore } from "./useIframeStore";
import { Conversation } from "@relaycc/xmtp-hooks";

interface IRemoteActions {
  connect: () => unknown;
  setOpen: (isOpen: boolean) => void;
}

let init = false;
let init2 = false;

export const useIframe = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [convo, setConvo] = useState<Conversation | null>(null);
  const { updateIsConnected, updateAddress, updateSigner } = useIframeStore(
    (state) => ({
      updateIsConnected: state.updateIsConnected,
      updateAddress: state.updateAddress,
      updateSigner: state.updateSigner,
      signer: state.signer,
    })
  );

  const [actions, setActions] = useState<IRemoteActions | null>(null);

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
          setConversation: (convo: Conversation) => {
            setConvo(convo);
          },
          setOpen: (isOpen: boolean) => {
            setIsOpen(isOpen);
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

  return {
    handleConnect,
    isOpen,
    setOpen: actions?.setOpen,
    conversation: convo,
  };
};
