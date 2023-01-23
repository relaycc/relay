import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

import * as Nav from '@/design/Nav';
import { FooterNav } from './FooterNav';
import { DMHeader } from '@/design/DMHeader';
import { useRouter } from 'next/router';
import { useRedirectWhenNotSignedIn } from '@/hooks/useRedirectWhenNotSignedInt';
import { useConnectedWallet } from '@/hooks/useConnectedWallet';
import { EthAddress, Message, useDirectMessage } from '@relaycc/xmtp-hooks';
import { MsgBundlesReceived } from '@/design/MsgBundlesReceived';
import { useRelayId } from '@/hooks/useRelayId';
import { isEnsName } from '@/lib/isEnsName';
import { MsgBox } from '@/design/MsgBox';
import { MsgBundlesSent } from '@/design/MsgBundlesSent';
import { Avatar } from './Avatar';

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
`;

export const DirectMessagesPage: FunctionComponent<{}> = () => {
  useRedirectWhenNotSignedIn('/receiver/messages');
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const router = useRouter();
  const peerAddress = router.query.handle as EthAddress;
  const { messages, sendMessage } = useDirectMessage({
    clientAddress: connectedWallet?.address as EthAddress,
    conversation: { peerAddress },
  });

  const parseMessage = useCallback((message: Message) => {
    return {
      id: message.id,
      senderAddress: message.senderAddress,
      content: message.content,
      conversation: message.conversation,
      time: format(new Date(message.sent), "hh:mm aaaaa'm'"),
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

  /* const relayId = useRelayId({ handle: address });
   * const ensName = useMemo(() => {
   *   if (isEnsName(relayId.ens.data)) {
   *     return relayId.ens.data;
   *   } else if (relayId.ens.isLoading) {
   *     return 'Loading...';
   *   } else {
   *     return address;
   *   }
   * }, [address, relayId]);
   */
  console.log({ parsedMessages, messages });
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

  const [msgValue, setMsgValue] = useState<string>('');

  const messageBuckets = useMemo(() => {
    if (!parsedMessages) {
      return [];
    }
    return getMessageBuckets(parsedMessages);
  }, [parsedMessages]);

  console.log({ messageBuckets });

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
    setMsgValue('');
  }, [msgValue, messages]);

  return (
    <Root>
      <DMHeader
        src={''}
        hasLoaded={false}
        ENSname={''}
        addressHeader={''}
        pinned={false}
        hasLENSicon={false}
      />
      <ScrollContainer>
        <HeadWrapper>
          <Avatar handle={peerAddress} onClick={() => null} size="xl" />
        </HeadWrapper>
        {messageBuckets.map((bucket) => {
          return <ListMessages peerAddress={peerAddress} bucket={bucket} />;
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

type MessageBucket = MessagesBucketProps['bucket'];

const ListMessages: FunctionComponent<
  MessagesBucketProps & { peerAddress: string }
> = ({ bucket, peerAddress }) => {
  if (peerAddress === bucket.messages[0].senderAddress) {
    return <MsgBundlesReceived messages={bucket.messages.reverse()} />;
  }
  return <MsgBundlesSent messages={bucket.messages.reverse()} />;
};
