import {
  Conversation,
  EthAddress,
  useConversations,
  useReadValue,
  useWriteValue,
  XmtpContext,
} from "@relaycc/xmtp-hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

const REQUEST_CONVERSATION_ID = "relay.cc/requests/v1";

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
  const { mutate: write } = useWriteValue({
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
    write({ content: JSON.stringify({}) });
  }, [value, valueIsError, valueIsLoading, write]);

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
          accepted.push(getConversationFromKey(key));
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
        ignored.push(getConversationFromKey(key));
      }
    });
    return ignored;
  }, [requestsObject, valueIsLoading, valueIsError]);

  const requestedConversations = useMemo((): Conversation[] => {
    if (valueIsLoading || valueIsError || !conversations || !requestsObject) {
      return [];
    }

    return conversations.filter((convo) => {
      const requestItem = requestsObject[getKeyFromConversation(convo)];
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
          [getKeyFromConversation(convo)]: RequestEnum.accepted,
        }),
        {}
      );

      const newObject = {
        ...requestsObject,
        ...newKeys,
      };
      accept({ content: JSON.stringify(newObject) });
    },
    [requestsObject, accept]
  );

  const ignoreConversations = useCallback(
    ({ conversations }: { conversations: Conversation[] }) => {
      if (!requestsObject || !conversations) {
        return;
      }

      const newKeys = conversations.reduce(
        (acc, convo) => ({
          ...acc,
          [getKeyFromConversation(convo)]: RequestEnum.ignored,
        }),
        {}
      );

      const newObject = {
        ...requestsObject,
        ...newKeys,
      };
      ignore({ content: JSON.stringify(newObject) });
    },
    [requestsObject, ignore]
  );

  const unIgnoreConversations = useCallback(
    ({ conversation }: { conversation: Conversation }) => {
      if (!requestsObject || !conversation) {
        return;
      }

      const newObject = {
        ...requestsObject,
      };
      delete newObject[getKeyFromConversation(conversation)];
      unignore({ content: JSON.stringify(newObject) });
    },
    [requestsObject, unignore]
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

const getKeyFromConversation = (conversation: Conversation) => {
  return `${conversation.peerAddress}${
    conversation?.context?.conversationId || ""
  }`;
};

const getConversationFromKey = (key: string) => {
  const peerAddress = key.slice(0, 42) as EthAddress;
  const conversationId = key.slice(42);
  return {
    peerAddress,
    context:
      conversationId.length === 0
        ? undefined
        : { conversationId, metadata: {} },
  };
};
