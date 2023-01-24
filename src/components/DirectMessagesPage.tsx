import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import { format } from "date-fns";

import * as Nav from "@/design/Nav";
import { FooterNav } from "./FooterNav";
import { DMHeader } from "@/design/DMHeader";
import { useRouter } from "next/router";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { EthAddress, Message, useDirectMessage } from "@relaycc/xmtp-hooks";
import { MsgBundlesReceived } from "@/design/MsgBundlesReceived";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import { MsgBox } from "@/design/MsgBox";
import { MsgBundlesSent } from "@/design/MsgBundlesSent";
import { Avatar } from "./Avatar";
import { getDisplayDate } from "@/lib/getDisplayDate";

const Root = styled.div`
  height: 700px;
  width: 400px;
  border-radius: 4px;
  margin: 6rem auto;
  box-shadow: 0px 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;

  ${Nav.Root} {
    margin-top: auto;
  }
`;

const HeadWrapper = styled.div`
  margin-top: 1rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 0.5rem;
`;

export const DirectMessagesPage: FunctionComponent<{}> = () => {
  useRedirectWhenNotSignedIn("/receiver/messages");
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const router = useRouter();
  const peerAddress = router.query.handle as EthAddress;
  const { messages, sendMessage } = useDirectMessage({
    clientAddress: connectedWallet?.address as EthAddress,
    conversation: { peerAddress },
  });
  const relayId = useRelayId({ handle: peerAddress });

  // TODO:Aaron Need a hook to get ens name or lens name or erh address if none exists
  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else if (relayId.ens.isLoading) {
      return "Loading...";
    } else {
      return peerAddress;
    }
  }, [peerAddress, relayId]);

  const parseMessage = useCallback((message: Message) => {
    return {
      id: message.id,
      senderAddress: message.senderAddress,
      content: message.content,
      conversation: message.conversation,
      time: getDisplayDate(message.sent),
    };
  }, []);

  const parsedMessages = useMemo(() => {
    if (!messages?.data) {
      return [];
    }
    return messages.data.map((message) => {
      if (parseMessage) {
        return parseMessage(message);
      } else {
        return message;
      }
    });
  }, [messages]);

  const getMessageBuckets = (messages: Message[]): MessageBucket[] => {
    const buckets: MessageBucket[] = [];
    const currentBucket = () => buckets[0];
    const currentSender = () => currentBucket()?.peerAddress;
    const currentMessage = () => currentBucket()?.messages[0];
    const currentSent = () => currentMessage()?.sent;

    for (const message of messages) {
      const shouldStartNewBucket = () => {
        if (currentBucket() === undefined) {
          return true;
        }
        if (currentSender() !== message.senderAddress) {
          return true;
        }
        if (currentSent()) {
          if (isFiveMinuteDifference(currentSent(), message.sent)) {
            return true;
          }
        }
      };

      if (shouldStartNewBucket()) {
        buckets.unshift({
          peerAddress: message.senderAddress,
          messages: [message],
        });
      } else {
        buckets[0].messages.push(message);
      }
    }

    return buckets;
  };

  const isFiveMinuteDifference = (a: Date, b: Date): boolean => {
    return Math.abs(a.getTime() - b.getTime()) > 300000;
  };

  const [msgValue, setMsgValue] = useState<string>("");

  const messageBuckets = useMemo(() => {
    if (!parsedMessages) {
      return [];
    }
    return getMessageBuckets(parsedMessages);
  }, [parsedMessages]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMsgValue(event.target.value);
    },
    []
  );

  const handleSend = useCallback(() => {
    if (!messages?.data || !messages.data.length) {
      return;
    }
    sendMessage.mutate({
      content: msgValue,
      conversation: messages.data[0].conversation,
    });
    setMsgValue("");
  }, [msgValue, messages]);

  useEffect(() => {
    const chat = document.getElementById("chatScroll");
    if (!chat) {
      return;
    }
    chat.scrollTop = chat.scrollHeight;
  }, [messages]);

  return (
    <Root>
      <DMHeader
        src={""}
        hasLoaded={true}
        ENSname={ensName}
        addressHeader={peerAddress}
        pinned={false}
      />
      <ScrollContainer id="chatScroll">
        <HeadWrapper>
          <Avatar handle={peerAddress} onClick={() => null} size="xl" />
        </HeadWrapper>
        {messageBuckets.map((bucket, idx) => {
          return (
            <ListMessages
              key={`${bucket.peerAddress}_${idx}`}
              peerAddress={peerAddress}
              bucket={bucket}
              isGray={!(idx % 2 == 0)}
            />
          );
        })}
      </ScrollContainer>
      <MsgBox
        active
        value={msgValue}
        handleChange={handleChange}
        handleSend={handleSend}
      />
      <FooterNav />
    </Root>
  );
};

export interface MessagesBucketProps {
  bucket: {
    peerAddress: string;
    messages: Message[];
  };
}

type MessageBucket = MessagesBucketProps["bucket"];

const ListMessages: FunctionComponent<
  MessagesBucketProps & { peerAddress: string } & { isGray: boolean }
> = ({ bucket, peerAddress, isGray }) => {
  const handle = useMemo(() => {
    if (!bucket || !bucket.messages.length) {
      return "";
    }
    return bucket.messages[0].senderAddress as string;
  }, [bucket]);
  const relayId = useRelayId({ handle });

  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else if (relayId.ens.isLoading) {
      return "Loading...";
    } else {
      return handle;
    }
  }, [handle, relayId]);

  if (peerAddress === bucket.messages[0].senderAddress) {
    return (
      <MsgBundlesReceived
        ensName={ensName}
        isLoading={false}
        messages={[...bucket.messages].reverse()}
        isGray={isGray}
      />
    );
  }
  return (
    <MsgBundlesSent
      ensName={ensName}
      isLoading={false}
      messages={[...bucket.messages].reverse()}
      isGray={isGray}
    />
  );
};
