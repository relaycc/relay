import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useConnectedWallet } from '@/hooks/useConnectedWallet';
import {
  Conversation,
  EthAddress,
  useDirectMessage,
  useFetchConversations,
} from '@relaycc/xmtp-hooks';
import { useRedirectWhenNotSignedIn } from '@/hooks/useRedirectWhenNotSignedInt';
import { HomeHeader } from '@/design/HomeHeader';
import styled from 'styled-components';
import { Chat } from '@/design/Chat';
import { useRelayId } from '@/hooks/useRelayId';
import { isEnsName } from '@/lib/isEnsName';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { FooterNav } from './FooterNav';
import * as Nav from '@/design/Nav';
import { motion } from 'framer-motion';
import { Search } from '@/design/Search';
import { Requests } from '@/design/Requests';
import * as Toast from '@/design/Toast';

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

export const ToastPosition = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 1rem;
`;

const SearchWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

interface IMessagesPageProps {}

export const MessagesPage: FunctionComponent<IMessagesPageProps> = () => {
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(true);
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const {
    data: conversations,
    isLoading,
    isError,
  } = useFetchConversations({
    clientAddress: connectedWallet?.address as EthAddress,
  });

  const clearFailureToast = useCallback(() => {
    setShowSuccessToast(false);
  }, [setShowSuccessToast]);

  useRedirectWhenNotSignedIn('/receiver/messages');

  if (isError || isLoading) {
    return null;
  }
  return (
    <Root>
      <HomeHeader handle={connectedWallet?.address as EthAddress} />
      <SearchWrapper>
        <Search active={true} />
      </SearchWrapper>
      <Requests />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {conversations?.map((convo, index) => {
          return (
            <Chats
              key={index}
              conversation={convo}
              address={connectedWallet?.address as EthAddress}
            />
          );
        })}
      </motion.div>
      {showSuccessToast && (
        <ToastPosition>
          <Toast.Success.Card
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}>
            <Toast.Success.AlertIcon />
            <Toast.Failure.Column>
              <Toast.Success.Title>Success</Toast.Success.Title>
              <Toast.Failure.Subtitle>
                To send a message press the button
              </Toast.Failure.Subtitle>
            </Toast.Failure.Column>
            <Toast.Failure.ExitIcon onClick={clearFailureToast} />
          </Toast.Success.Card>
        </ToastPosition>
      )}
      <FooterNav />
    </Root>
  );
};

const Chats: FunctionComponent<{
  conversation: Conversation;
  address: EthAddress;
}> = ({ conversation, address }) => {
  const router = useRouter();
  const {
    messages: { data, isError, isLoading },
  } = useDirectMessage({
    clientAddress: address,
    conversation,
    stream: false,
  });

  const messageDetails = useMemo(() => {
    if (!data?.length) {
      return [];
    }
    const last = data[0];
    return [
      {
        message: last.content as string,
        time: format(new Date(last.sent), "hh:mm aaaaa'm'"),
      },
    ];
  }, [data]);

  const relayId = useRelayId({ handle: address });
  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else if (relayId.ens.isLoading) {
      return 'Loading...';
    } else {
      return address;
    }
  }, [address, relayId]);

  const navigateToDm = useCallback(() => {
    router.push(`/receiver/dm/${conversation.peerAddress}`);
  }, [conversation]);

  if (isLoading || isError) {
    return null;
  }

  return (
    <Chat
      handleClick={navigateToDm}
      handle={conversation.peerAddress}
      hasLoaded={!!ensName}
      ENSname={ensName}
      messageDetails={messageDetails}
      hasLENS={false}
      isPinned={false}
    />
  );
};
