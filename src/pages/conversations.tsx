import type { NextPage } from "next";
import { PageDynamic } from "components";
import { useSigner } from "wagmi";
import {
  useRelay,
  useSetWallet,
  byMostRecentMessage,
  pickPeerAddress,
} from "@relaycc/receiver";
import { useEffect } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const Home: NextPage = () => {
  const signer = useSigner();
  const connect = useConnectModal();
  const dispatch = useRelay((state) => state.dispatch);
  const conversations = useRelay((state) => state.channels.conversationList);
  const client = useRelay((state) => state.client);
  const setWallet = useSetWallet();

  useEffect(() => {
    if (signer.data) {
      setWallet(signer.data);
    }
  }, [signer.data, setWallet]);

  useEffect(() => {
    if (signer.data !== undefined && signer.data !== null) {
      dispatch({ id: "sign in", wallet: signer.data });
    }
  }, [dispatch, signer.data]);

  useEffect(() => {
    if (client !== null) {
      dispatch({ id: "load conversation list" });
    }
  }, [dispatch, client]);

  useEffect(() => {
    connect.openConnectModal && connect.openConnectModal();
  }, [connect]);

  return (
    <PageDynamic
      isLoading={conversations === undefined || client === null}
      addresses={
        conversations === undefined || client === null
          ? []
          : byMostRecentMessage(conversations)
              .map((m) => pickPeerAddress(client.address, m))
              .map((i) => i)
              .reverse()
      }
    />
  );
};

export default Home;
