import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";
import * as ENSName from "@/design/ENSName";
export * as Time from "@/design/Time";

import * as Nav from "@/design/Nav";
import { FooterNav } from "./FooterNav";
import { useRouter } from "next/router";
import { BackIcon } from "@/design/BackIcon";
import * as HomeHeader from "@/design/HomeHeader";
import { Active, Editing, Inactive } from "@/design/Edit";
import {
  Conversation,
  EthAddress,
  useDirectMessage,
} from "@relaycc/xmtp-hooks";
import { useRelayId } from "@/hooks/useRelayId";
import { isEnsName } from "@/lib/isEnsName";
import * as MessagePreview from "@/design/MessagePreview";
import { getDisplayDate } from "@/lib/getDisplayDate";
import { Checkbox } from "@/design/Checkbox";
import { InfoToastContainer, InfoToastDescription } from "@/design/InfoToast";
import { InfoToastIcon } from "@/design/InfoToastIcon";

export const RequestsPage: FunctionComponent<{}> = () => {
  const router = useRouter();
  const navigateBack = useCallback(() => {
    router.push(`/receiver/messages`);
  }, [router]);
  const [editing, setEditing] = useState(false);
  const toggleEditing = useCallback(() => setEditing(!editing), [editing]);
  const handleAccept = useCallback((conversation: Conversation) => {
    console.log(conversation);
  }, []);
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
      <ScrollContainer id="chatScroll">
        <RequestedChats editing={editing} handleAccept={handleAccept} />
        <RequestedChats editing={editing} handleAccept={handleAccept} />
        <RequestedChats editing={editing} handleAccept={handleAccept} />
        <RequestedChats editing={editing} handleAccept={handleAccept} />
        <RequestedChats editing={editing} handleAccept={handleAccept} />
      </ScrollContainer>

      <FooterNav />
    </Root>
  );
};

const RequestedChats: FunctionComponent<{
  editing: boolean;
  handleAccept: () => void;
}> = ({ editing, handleAccept }) => {
  const [selected, setSelected] = useState(false);
  const toggleSelected = useCallback(() => setSelected(!selected), [selected]);
  useEffect(() => setSelected(false), [editing]);
  return (
    <MessagePreview.Root>
      <MessagePreview.Wrapper>
        {editing && <Checkbox selected={selected} onClick={toggleSelected} />}
        <MessagePreview.Avatar
          handle={"peerAddress"}
          onClick={() => null}
          size="md"
        />
        <MessagePreview.MsgDetails>
          <MessagePreview.NameAndIcons>
            <MessagePreview.ENSName.EnsNameMonofontMd>
              {"ensName"}
            </MessagePreview.ENSName.EnsNameMonofontMd>
          </MessagePreview.NameAndIcons>
          <MessagePreview.MessageDetails>
            {"Request message"}
          </MessagePreview.MessageDetails>
        </MessagePreview.MsgDetails>
      </MessagePreview.Wrapper>
      <MessagePreview.StyledTime>
        <MessagePreview.Time.Root>{"Today"} </MessagePreview.Time.Root>
      </MessagePreview.StyledTime>
    </MessagePreview.Root>
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
const ToastPosition = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 1rem;
`;
const PinWrapper = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;
