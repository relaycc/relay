import { useCallback, useEffect } from "react";
import { Conversation } from "@relaycc/xmtp-hooks";
import { create } from "zustand";
import { useXmtpClient, EthAddress } from "@relaycc/xmtp-hooks";
import { useAccount } from "wagmi";

export type Page =
  | { id: "sign"; redirect?: Page }
  | { id: "messages" }
  | { id: "requests" }
  | { id: "dm"; conversation: Conversation };

export const useReceiverWindow = create<{
  page: Page | null;
  setPage: (page: Page | null) => void;
}>((set) => ({
  page: null,
  setPage: (page) => set({ page }),
}));

export const useGoToSign = () => {
  const { setPage } = useReceiverWindow();
  return useCallback(() => {
    setPage({ id: "sign" });
  }, [setPage]);
};

export const useGoToMessages = () => {
  const { setPage } = useReceiverWindow();
  return useCallback(() => {
    setPage({ id: "messages" });
  }, [setPage]);
};

export const useGoToRequests = () => {
  const { setPage } = useReceiverWindow();
  return useCallback(() => {
    setPage({ id: "requests" });
  }, [setPage]);
};

export const useGoToDm = () => {
  const { setPage } = useReceiverWindow();
  return useCallback(
    (conversation: Conversation) => {
      setPage({ id: "dm", conversation });
    },
    [setPage]
  );
};

export const useToggle = () => {
  const { page, setPage } = useReceiverWindow();
  return useCallback(
    (pageToToggle: Page) => {
      if (page === null) {
        setPage(pageToToggle);
      } else {
        setPage(null);
      }
    },
    [page, setPage]
  );
};

export const useRedirectWhenNotSignedIn = () => {
  const { page, setPage } = useReceiverWindow();
  const { address, isConnected } = useAccount();
  const xmtpClient = useXmtpClient({
    clientAddress: address as EthAddress,
  });

  useEffect(() => {
    if (
      xmtpClient.data === undefined ||
      xmtpClient.data === null ||
      xmtpClient.data.address() !== address
    ) {
      setPage({ id: "sign", redirect: page || { id: "messages" } });
    }
  }, [xmtpClient.data?.address, address, setPage]);
};

export const useRedirectWhenSignedIn = () => {
  const { address } = useAccount();
  const { setPage } = useReceiverWindow();
  const xmtpClient = useXmtpClient({
    clientAddress: address as EthAddress,
  });

  useEffect(() => {
    if (
      xmtpClient.data !== undefined &&
      xmtpClient.data !== null &&
      xmtpClient.data.address() === address
    ) {
      setPage({ id: "messages" });
    }
  }, [xmtpClient.data, address, setPage]);
};
