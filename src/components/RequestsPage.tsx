import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import * as Time from "@/design/Time";
import * as Nav from "@/design/Nav";
import * as IgnoredMsg from "@/design/IgnoredMsg";
import * as DropdownIcon from "@/design/DropdownIcon";
import * as Request from "@/design/Request";

import { FooterNav } from "./FooterNav";
import { useRouter } from "next/router";
import { BackIcon } from "@/design/BackIcon";
import * as HomeHeader from "@/design/HomeHeader";
import { Active, Editing } from "@/design/Edit";
import * as MessagePreview from "@/design/MessagePreview";
import { Checkbox } from "@/design/Checkbox";
import { InfoToastContainer, InfoToastDescription } from "@/design/InfoToast";
import { InfoToastIcon } from "@/design/InfoToastIcon";
import * as Toast from "@/design/Toast";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonView } from "@/design/ButtonView";
import {
  Conversation,
  EthAddress,
  useDirectMessage,
} from "@relaycc/xmtp-hooks";
import { useConnectedWallet } from "@/hooks/useConnectedWallet";
import { useRedirectWhenNotSignedIn } from "@/hooks/useRedirectWhenNotSignedInt";
import { useReadWriteValue } from "@/hooks/useReadWriteValue";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import { getDisplayDate } from "@/lib/getDisplayDate";
import { Loading } from "./MessagesPage";

export const RequestsPage: FunctionComponent<{}> = () => {
  const connectedWallet = useConnectedWallet((state) => state.connectedWallet);
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [showIgnored, setShowIgnored] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selected, setSelected] = useState<Conversation[]>([]);

  const {
    requestedConversations,
    ignoredConversations,
    acceptConversations,
    ignoreConversations,
    unIgnoreConversations,
    isLoading,
  } = useReadWriteValue({
    clientAddress: connectedWallet?.address as EthAddress,
  });

  const toggleIgnored = useCallback(
    () => setShowIgnored(!showIgnored),
    [showIgnored]
  );

  useRedirectWhenNotSignedIn("/receiver/requests");

  const toggleEditing = useCallback(() => {
    setEditing(!editing);
    setSelected([]);
  }, [editing]);

  const navigateBack = useCallback(() => {
    router.push(`/receiver/messages`);
  }, [router]);

  const handleAccept = useCallback(() => {
    setEditing(false);
    acceptConversations({ conversations: selected });
  }, [selected]);

  const handleIgnore = useCallback(() => {
    setEditing(false);
    ignoreConversations({ conversations: selected });
  }, [selected]);

  return (
    <Root>
      <HomeHeader.Root>
        <BackIcon onClick={navigateBack} />
        <HomeHeader.Title>Requests</HomeHeader.Title>
        {editing ? (
          <Editing onClick={toggleEditing} />
        ) : (
          <Active onClick={toggleEditing} />
        )}
      </HomeHeader.Root>
      <InfoToastContainer>
        <InfoToastDescription>
          Use the edit button to ignore or accept messages, restore any ignored
          message by clicking <InfoToastIcon />
        </InfoToastDescription>
      </InfoToastContainer>
      <ScrollContainer>
        {isLoading ? (
          <>
            <Loading />
            <Loading />
          </>
        ) : (
          requestedConversations.map((convo) => {
            return (
              <RequestedChat
                selected={selected}
                setSelected={setSelected}
                address={connectedWallet?.address as EthAddress}
                conversation={convo}
                editing={editing}
                handleAccept={handleAccept}
              />
            );
          })
        )}
      </ScrollContainer>
      <IgnoredMsg.Root onClick={toggleIgnored}>
        <IgnoredMsg.Label>Ignored Messages</IgnoredMsg.Label>
        {showIgnored ? <DropdownIcon.Close /> : <DropdownIcon.Open />}
      </IgnoredMsg.Root>
      {showIgnored && (
        <AnimatePresence>
          <IgnoredRoot
            initial={{ maxHeight: "0" }}
            animate={{ top: "1rem", maxHeight: "32rem" }}
            exit={{ top: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <>
                <Loading />
                <Loading />
              </>
            ) : (
              ignoredConversations.map((convo) => {
                return (
                  <IgnoredChat
                    selected={selected}
                    setSelected={setSelected}
                    address={connectedWallet?.address as EthAddress}
                    conversation={convo}
                    editing={editing}
                    handleUnignore={unIgnoreConversations}
                  />
                );
              })
            )}
          </IgnoredRoot>
        </AnimatePresence>
      )}
      <ButtonRow>
        <ButtonWrapper>
          <ButtonView
            disabled={!editing}
            size={"xl"}
            hierarchy={"secondary"}
            label={"Ignore"}
            handleClick={handleIgnore}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <ButtonView
            disabled={!editing}
            size={"xl"}
            hierarchy={"primary"}
            label={"Accept"}
            handleClick={handleAccept}
          />
        </ButtonWrapper>
      </ButtonRow>
      <FooterNav />
      {showToast && <FailToast clearToast={() => setShowToast(false)} />}
    </Root>
  );
};

const RequestedChat: FunctionComponent<{
  setSelected: React.Dispatch<React.SetStateAction<Conversation[]>>;
  selected: Conversation[];
  address: EthAddress;
  conversation: Conversation;
  editing: boolean;
  handleAccept: () => void;
}> = ({
  editing,
  handleAccept,
  conversation,
  address,
  setSelected,
  selected,
}) => {
  const toggleSelected = useCallback(() => {
    if (selected.includes(conversation)) {
      setSelected(selected.filter((convo) => convo !== conversation));
      return;
    }
    setSelected([...selected, conversation]);
  }, [selected]);

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

  if (isLoading || isError) {
    return null;
  }

  return (
    <MessagePreview.Root onClick={toggleSelected}>
      <MessagePreview.Wrapper>
        {editing && <Checkbox selected={selected.includes(conversation)} />}
        <MessagePreview.Avatar
          handle={"peerAddress"}
          onClick={() => null}
          size="md"
        />
        <MessagePreview.MsgDetails>
          <MessagePreview.NameAndIcons>
            <MessagePreview.ENSName.EnsNameMonofontMd>
              {ensName}
            </MessagePreview.ENSName.EnsNameMonofontMd>
          </MessagePreview.NameAndIcons>
          <MessagePreview.MessageDetails>
            {lastMessage?.content as string}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </MessagePreview.Wrapper>
      <MessagePreview.StyledTime>
        <Time.Root>{getDisplayDate(lastMessage?.sent as Date)} </Time.Root>
      </MessagePreview.StyledTime>
    </MessagePreview.Root>
  );
};

const IgnoredChat: FunctionComponent<{
  address: EthAddress;
  conversation: Conversation;
  handleUnignore: ({ conversation }: { conversation: Conversation }) => void;
}> = ({ conversation, address, handleUnignore }) => {
  const {
    messages: { data, isError, isLoading },
  } = useDirectMessage({
    clientAddress: address,
    conversation,
    stream: false,
  });

  const handleRestoreChat = useCallback(() => {
    if (!conversation) {
      return;
    }
    handleUnignore({ conversation });
  }, [conversation]);

  const lastMessage = data?.[0];

  const relayId = useRelayId({ handle: conversation.peerAddress });

  const ensName = useMemo(() => {
    if (isEnsName(relayId.ens.data)) {
      return relayId.ens.data;
    } else {
      return relayId.address.data;
    }
  }, [relayId]);

  if (isLoading || isError) {
    return null;
  }
  return (
    <Request.Root>
      <MessagePreview.Wrapper>
        <IgnoredIconContainer onClick={handleRestoreChat}>
          <InfoToastIcon />
        </IgnoredIconContainer>
        <MessagePreview.Avatar
          handle={"peerAddress"}
          onClick={() => null}
          size="md"
        />
        <MessagePreview.MsgDetails>
          <MessagePreview.NameAndIcons>
            <MessagePreview.ENSName.EnsNameMonofontMd>
              {ensName}
            </MessagePreview.ENSName.EnsNameMonofontMd>
          </MessagePreview.NameAndIcons>
          <MessagePreview.MessageDetails>
            {lastMessage?.content as string}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </MessagePreview.Wrapper>
      <MessagePreview.StyledTime>
        <Time.Root>{getDisplayDate(lastMessage?.sent as Date)} </Time.Root>
      </MessagePreview.StyledTime>
    </Request.Root>
  );
};

const FailToast: FunctionComponent<{
  clearToast: () => void;
}> = (clearToast) => {
  return (
    <ToastPosition>
      <Toast.Failure.Card
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Toast.Failure.AlertIcon />
        <Toast.Failure.Column>
          <Toast.Failure.Title>
            Failed to accept/ignore messages
          </Toast.Failure.Title>
          <Toast.Failure.Subtitle>
            Check connection and try again.
          </Toast.Failure.Subtitle>
        </Toast.Failure.Column>
        <Toast.Failure.ExitIcon onClick={clearToast} />
      </Toast.Failure.Card>
    </ToastPosition>
  );
};

const Root = styled.div`
  height: 700px;
  width: 400px;
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
const IgnoredRoot = styled(motion.div)`
  display: flex;
  align-self: flex-end;
  flex-grow: 1;
  flex-direction: column;
  box-shadow: 0 4px 32px rgba(16, 24, 40, 0.12);
  padding: 0 0 16px;
  background: #ffffff;
  overflow-y: auto;
  height: 32rem;
  width: 400px;
  left: 0;
  bottom: 0;
`;
const IgnoredIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;
const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 0.5rem;
`;

const ToastPosition = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 1rem;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  background: #ffffff;
`;
const ButtonWrapper = styled.div`
  width: 11.2rem;
`;
