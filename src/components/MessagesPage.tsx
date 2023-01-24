import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import {
  Conversation,
  EthAddress,
  useDirectMessage,
  useConversations,
} from "@relaycc/xmtp-hooks";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import * as HomeHeader from "@/design/HomeHeader";
import * as MessagePreview from "@/design/MessagePreview";
import styled, { css } from "styled-components";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import { getDisplayDate } from "@/lib/getDisplayDate";
import { useRouter } from "next/router";
import { FooterNav } from "./FooterNav";
import * as Nav from "@/design/Nav";
import { Search } from "@/design/Search";
import { NewMessage } from "./NewMessage";
import { setSeconds } from "date-fns";

const Root = styled.div`
  height: 700px;
  width: 400px;
  margin: 6rem auto;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.12);
  border-radius: 14px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  overflow-x: hidden;

  ${Nav.Root} {
    margin-top: auto;
  }
`;

const SearchWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

const ConversationList = styled.ol`
  overflow-y: scroll;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  padding-inline-end: 0;
  margin-inline-end: 0;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const loadingGradient = css`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  border-radius: 6px;
  height: 100%;
  width: 100%;
`;

const LoadingCircle = styled.div`
  ${loadingGradient};
  height: 40px;
  width: 40px;
  min-width: 40px;
  border-radius: 100%;
`;

const LoadingTitle = styled.div`
  ${loadingGradient};
  height: 1rem;
  width: 96px;
`;

const LoadingSubtitle = styled.div`
  ${loadingGradient};
  height: 1rem;
  width: 231px;
`;

const LoadingRoot = styled.div`
  display: flex;
  height: 4.5rem;
  padding: 1rem;
`;

const LoadingColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1.5rem;
`;

const LoadingTime = styled.div`
  ${loadingGradient};
  height: 0.75rem;
  align-self: center;
  width: 54px;
  margin-left: 1rem;
`;

const Loading = () => (
  <LoadingRoot>
    <LoadingCircle />
    <LoadingColumn>
      <LoadingTitle />
      <LoadingSubtitle />
    </LoadingColumn>
    <LoadingTime />
  </LoadingRoot>
);

interface IMessagesPageProps {}

export const MessagesPage: FunctionComponent<IMessagesPageProps> = () => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState<boolean>(false);
  const connectedWallet = useConnectedWallet((s) => s.connectedWallet);
  const {
    data: conversations,
    isLoading,
    isError,
  } = useConversations({
    clientAddress: connectedWallet?.address as EthAddress,
  });

  const navigateToProfile = useCallback(() => {
    router.push("/receiver/profile");
  }, [router]);

  useRedirectWhenNotSignedIn("/receiver/messages");

  const filteredConversations = useMemo(() => {
    if (!searchInput) {
      return conversations;
    } else {
      return conversations?.filter((convo) => {
        const ret = convo.peerAddress
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        if (ret) {
          console.log(convo.peerAddress);
        }
        return ret;
      });
    }
  }, [conversations, searchInput]);

  return (
    <Root>
      <HomeHeader.Root>
        <HomeHeader.Title>Messages</HomeHeader.Title>
        <HomeHeader.IconContainer>
          <HomeHeader.Avatar
            handle={connectedWallet?.address as EthAddress}
            size="sm"
            onClick={navigateToProfile}
          />
          {connectedWallet ? (
            <HomeHeader.Compose.Active onClick={() => setShowNewMessage(true)} />
          ) : (
            <HomeHeader.Compose.Inactive onClick={() => null} />
          )}
        </HomeHeader.IconContainer>
      </HomeHeader.Root>
      <SearchWrapper>
        <Search
          placeholder={"Search for an ETH address"}
          onChange={(e: any) => {
            // TODO: Not sure why isn't getting the type inference here.
            setSearchInput(e.target.value);
          }}
        />
      </SearchWrapper>
      {/* <Requests /> */}
      <ConversationList>
        {(() => {
          if (isLoading) {
            return (
              <>
                <Loading />
                <Loading />
                <Loading />
                <Loading />
                <Loading />
                <Loading />
                <Loading />
                <Loading />
              </>
            );
          } else {
            return filteredConversations?.map((convo, index) => {
              return (
                <Chats
                  key={index}
                  conversation={convo}
                  address={connectedWallet?.address as EthAddress}
                />
              );
            });
          }
        })()}
      </ConversationList>
      <FooterNav />
      {showNewMessage && (
        <NewMessage doClose={() => setShowNewMessage(false)} />
      )}
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

  const lastMessage = data?.[0];
  const relayId = useRelayId({ handle: conversation.peerAddress });

  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else {
      return relayId.address.data;
    }
  }, [relayId]);

  const navigateToDm = useCallback(() => {
    router.push(`/receiver/dm/${conversation.peerAddress}`);
  }, [conversation.peerAddress, router]);

  if (isLoading || isError) {
    return null;
  }

  return (
    <MessagePreview.Root onClick={navigateToDm}>
      <MessagePreview.Wrapper>
        <MessagePreview.Avatar
          handle={conversation.peerAddress}
          onClick={() => null}
          size="md"
        />
        <MessagePreview.MsgDetails>
          <MessagePreview.NameAndIcons>
            <MessagePreview.ENSName.EnsNameMonofontMd>
              {ensName}
              {conversation.context?.conversationId.includes("lens.dev") &&
                " 🌿"}
            </MessagePreview.ENSName.EnsNameMonofontMd>
          </MessagePreview.NameAndIcons>
          <MessagePreview.MessageDetails>
            {(() => {
              try {
                return `${lastMessage?.content}`;
              } catch {
                return null;
              }
            })()}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </MessagePreview.Wrapper>
      <MessagePreview.StyledTime>
        <MessagePreview.Time.Root>
          {(() => {
            try {
              return getDisplayDate(lastMessage?.sent as Date);
            } catch {
              return null;
            }
          })()}
        </MessagePreview.Time.Root>
      </MessagePreview.StyledTime>
    </MessagePreview.Root>
  );
};
