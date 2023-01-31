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
  const [requestsObject, setRequestsObject] = useState<Record<
    string,
    RequestEnum
  > | null>(null);

  const { data: conversations, isLoading: requestsLoading } = useConversations({
    clientAddress,
  });

  const {
    data: value,
    isError: valueIsError,
    isLoading: valueIsLoading,
  } = useReadValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: accept, isLoading: acceptIsLoading } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: ignore, isLoading: ignoreIsLoading } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  const { mutate: unignore, isLoading: unignoreIsLoading } = useWriteValue({
    clientAddress,
    key: REQUEST_CONVERSATION_ID,
  });

  useEffect(() => {
    if (valueIsLoading || valueIsError) {
      return;
    }
    if (value) {
      setRequestsObject(JSON.parse(value as string));
      return;
    }
  }, [value, valueIsError, valueIsLoading]);

  const acceptedConversations = useMemo(
    function (): Conversation[] {
      if (valueIsLoading || valueIsError || !requestsObject) {
        return [];
      }
      const accepted: Conversation[] = [];
      Object.entries(requestsObject).forEach(([key, value]) => {
        if (value !== RequestEnum.accepted) {
          return;
        } else {
          const peerAddress = key.slice(0, 42) as EthAddress;
          const conversationId = key.slice(42);
          accepted.push({
            peerAddress,
            context: { conversationId, metadata: {} },
          });
        }
      });
      return accepted;
    },
    [requestsObject, valueIsLoading, valueIsError]
  );

  const ignoredConversations = useMemo((): Conversation[] => {
    if (valueIsLoading || valueIsError || !requestsObject) {
      return [];
    }
    const ignored: Conversation[] = [];
    Object.entries(requestsObject).forEach(([key, value]) => {
      if (value !== RequestEnum.ignored) {
        return;
      } else {
        const peerAddress = key.slice(0, 42) as EthAddress;
        const conversationId = key.slice(42);
        ignored.push({
          peerAddress,
          context: { conversationId, metadata: {} },
        });
      }
    });
    return ignored;
  }, [requestsObject, valueIsLoading, valueIsError]);

  const requestedConversations = useMemo((): Conversation[] => {
    if (valueIsLoading || valueIsError || !conversations || !requestsObject) {
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
  }, [conversations, requestsObject, valueIsLoading, valueIsError]);

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
      accept({ content: JSON.stringify(newObject) });
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
      ignore({ content: JSON.stringify(newObject) });
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
      unignore({ content: JSON.stringify(newObject) });
    },
    [requestsObject]
  );

  return {
    requestsLoading,
    acceptedLoading: valueIsLoading,
    requestsObject,
    acceptConversations,
    acceptIsLoading,
    ignoreIsLoading,
    unignoreIsLoading,
    ignoreConversations,
    unIgnoreConversations,
    acceptedConversations,
    ignoredConversations,
    requestedConversations,
  };
};
