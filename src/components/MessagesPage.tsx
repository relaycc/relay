import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { AnimatePresence } from "framer-motion";
import { EthAddress } from "@relaycc/xmtp-hooks";
import * as HomeHeader from "@/design/HomeHeader";
import styled from "styled-components";
import { isEnsName } from "@/lib/isEnsName";
import { Search } from "@/design/Search";
import { NewMessage } from "./NewMessage";
import * as Skeleton from "@/design/Skeleton";
import { useReadWriteValue } from "@/hooks/useReadWriteValue";
import { ChatsPreview } from "./ChatsPreview";
import RequestPreview from "@/components/RequestPreview";
import { AuthMenu } from "./AuthMenu";
import { useAccount, useConnect } from "wagmi";
import {
  textSmallBold,
  textMdSemiBold,
  textSmallRegular,
} from "@/design/typography";
import { useXmtpClient } from "@relaycc/xmtp-hooks";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { useProfile, useWalletLogin } from "@lens-protocol/react";

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

export const Loading = () => (
  <Skeleton.LoadingRoot>
    <Skeleton.LoadingCircle />
    <Skeleton.LoadingColumn>
      <Skeleton.LoadingTitle />
      <Skeleton.LoadingSubtitle />
    </Skeleton.LoadingColumn>
    <Skeleton.LoadingTime />
  </Skeleton.LoadingRoot>
);

interface IMessagesPageProps {}

export const MessagesPage: FunctionComponent<IMessagesPageProps> = () => {
  const { address, isConnected } = useAccount();
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [showNewMessage, setShowNewMessage] = useState<boolean>(false);
  const xmtpClient = useXmtpClient({
    clientAddress: address as EthAddress,
  });
  const isSignedIn =
    xmtpClient.data !== null &&
    xmtpClient.data !== undefined &&
    xmtpClient.data.address() === address;
  const [showAuthMenu, setShowAuthMenu] = useState<boolean>(!isSignedIn);
  const { acceptedConversations, acceptedLoading } = useReadWriteValue({
    clientAddress: address as EthAddress,
  });
  const {
    login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });
  const onLoginClick = async () => {
    // if (isConnected) {
    //   await disconnectAsync();
    // }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      console.log(await login(signer));
    }
  };
  const { data: profile, loading } = useProfile({
    handle: "seanb.lens",
    // profileId: "0x01",
    // profileId: `${peerAddress}`,
  });
  useEffect(() => console.log({ profile, loading }), [profile, loading]);
  const filteredConversations = useMemo(() => {
    if (!searchInput) {
      return acceptedConversations;
    } else {
      return acceptedConversations?.filter((convo) => {
        return convo.peerAddress
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
    }
  }, [acceptedConversations, searchInput]);

  return (
    <>
      <HomeHeader.Root>
        <HomeHeader.Title onClick={onLoginClick}>Messages</HomeHeader.Title>
        <HomeHeader.IconContainer>
          <HomeHeader.Avatar
            handle={address as EthAddress}
            size="sm"
            onClick={() => setShowAuthMenu(true)}
          />
          {isConnected ? (
            <HomeHeader.Compose.Active
              onClick={() => setShowNewMessage(true)}
            />
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
      <ConversationList>
        {(() => {
          if (acceptedLoading) {
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
            return (
              <>
                <RequestPreview />
                {filteredConversations?.map((convo, index) => {
                  return (
                    <ChatsPreview
                      key={index}
                      conversation={convo}
                      address={address as EthAddress}
                    />
                  );
                })}
              </>
            );
          }
        })()}
      </ConversationList>

      {!acceptedLoading && filteredConversations.length === 0 && (
        <NoResultText>
          <NoResultTitle>No messages found</NoResultTitle>
          <NoResultSubtitle>
            Please{" "}
            <CreateNew onClick={() => setShowNewMessage(true)}>
              create a new conversation
            </CreateNew>{" "}
            or accept a message request.
          </NoResultSubtitle>
        </NoResultText>
      )}

      <AnimatePresence>
        {showNewMessage && (
          <NewMessage
            clientAddress={address as EthAddress}
            doClose={() => setShowNewMessage(false)}
          />
        )}
      </AnimatePresence>
      {showAuthMenu && <AuthMenu doClose={() => setShowAuthMenu(false)} />}
    </>
  );
};

const NoResultText = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 4px;
  height: 3rem;
  margin-top: 5rem;
`;

const NoResultTitle = styled.div`
  ${textMdSemiBold};
  color: ${(p) => p.theme.colors.gray["900"]};
  text-align: center;
`;

const NoResultSubtitle = styled.div`
  width: 10rem;
  ${textSmallRegular};
  color: ${(p) => p.theme.colors.gray["400"]};
  text-align: center;
`;

const CreateNew = styled.span`
  cursor: pointer;
  ${textSmallBold}
  color: ${(p) => p.theme.colors.primary["500"]};
`;
