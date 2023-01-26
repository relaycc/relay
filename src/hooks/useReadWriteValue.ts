import {
  Conversation,
  EthAddress,
  useConversations,
  useReadValue,
  useWriteValue,
  XmtpContext,
} from "@relaycc/xmtp-hooks";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

const REQUEST_CONVERSATION_ID = "relay.cc/requests";

export enum RequestEnum {
  accepted = "accepted",
  ignored = "ignored",
}

interface UseReadWriteValueProps {
  clientAddress: EthAddress;
}

export const useReadWriteValue = ({
  clientAddress,
}: UseReadWriteValueProps) => {
  const workerContext = useContext(XmtpContext);

  // {[conversation.peerAddress + conversation.context.conversationId]: "accepted" | "ignored"}
  const [requestsObject, setRequestsObject] = useState<Record<
    string,
    RequestEnum
  > | null>(null);

  const {
    data: conversations,
    isLoading,
    isError,
  } = useConversations({
    clientAddress,
  });

  const {
    data: value,
    isError: valueError,
    isLoading: valueLoading,
  } = useReadValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: write } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  console.log({ requestsObject });

  useEffect(() => {
    if (valueLoading || valueError) {
      return;
    }
    if (value) {
      //write({ content: JSON.stringify({}) });
      setRequestsObject(JSON.parse(value as string));
      return;
    }
    workerContext?.workerClient.createIdentity().then((identity) => {
      write({ content: JSON.stringify({}) });
    });
  }, [value, valueError, valueLoading, write]);

  const acceptedConversations = useMemo(
    function (): Conversation[] {
      if (isLoading || isError || !conversations || !requestsObject) {
        return [];
      }
      return conversations.filter((convo) => {
        const requestItem =
          requestsObject[
            `${convo.peerAddress}${convo?.context?.conversationId || ""}`
          ];
        return requestItem === RequestEnum.accepted;
      });
    },
    [conversations, requestsObject, isLoading, isError]
  );

  const ignoredConversations = useMemo((): Conversation[] => {
    if (isLoading || isError || !conversations || !requestsObject) {
      return [];
    }
    return conversations.filter((convo) => {
      const requestItem =
        requestsObject[
          `${convo.peerAddress}${convo?.context?.conversationId || ""}`
        ];
      return requestItem === RequestEnum.ignored;
    });
  }, [conversations, requestsObject, isLoading, isError]);

  const requestedConversations = useMemo((): Conversation[] => {
    if (isLoading || isError || !conversations || !requestsObject) {
      return [];
    }

    return conversations.filter((convo) => {
      const requestItem =
        requestsObject[
          `${convo.peerAddress}${convo?.context?.conversationId || ""}`
        ];
      return (
        requestItem === undefined &&
        convo.context?.conversationId !== REQUEST_CONVERSATION_ID
      );
    });
  }, [conversations, requestsObject, isLoading, isError]);

  const acceptConversations = useCallback(
    ({ conversations }: { conversations: Conversation[] }) => {
      if (!requestsObject || !conversations) {
        return;
      }

      const newKeys = conversations.reduce(
        (acc, convo) => ({
          ...acc,
          [`${convo.peerAddress}${convo?.context?.conversationId || ""}`]:
            RequestEnum.accepted,
        }),
        {}
      );

      const newObject = {
        ...requestsObject,
        ...newKeys,
      };
      write({ content: JSON.stringify(newObject) });
    },
    [requestsObject]
  );

  const ignoreConversations = useCallback(
    ({ conversations }: { conversations: Conversation[] }) => {
      if (!requestsObject || !conversations) {
        return;
      }

      const newKeys = conversations.reduce(
        (acc, convo) => ({
          ...acc,
          [`${convo.peerAddress}${convo?.context?.conversationId || ""}`]:
            RequestEnum.ignored,
        }),
        {}
      );

      const newObject = {
        ...requestsObject,
        ...newKeys,
      };
      write({ content: JSON.stringify(newObject) });
    },
    [requestsObject]
  );

  const unIgnoreConversations = useCallback(
    ({ conversation }: { conversation: Conversation }) => {
      if (!requestsObject || !conversation) {
        return;
      }

      const newObject = {
        ...requestsObject,
        [`${conversation.peerAddress}${
          conversation?.context?.conversationId || ""
        }`]: RequestEnum.accepted,
      };
      write({ content: JSON.stringify(newObject) });
    },
    [requestsObject]
  );

  return {
    isLoading,
    requestsObject,
    acceptConversations,
    ignoreConversations,
    unIgnoreConversations,
    acceptedConversations,
    ignoredConversations,
    requestedConversations,
  };
};
