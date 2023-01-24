import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { textXsRegular } from "@/design/typography";
import { StatusIcon } from "@/design/StatusIcon";
import * as Time from "@/design/Time";
import * as ENSName from "@/design/ENSName";
import { MsgPreview } from "@/design/MsgPreview";
import { Avatar } from "@/components/Avatar";
import { EthAddress, Message } from "@relaycc/xmtp-hooks";

const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #ffffff;
  margin-top: 1.4rem;
  width: 100%;
`;

const FirstMsgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;
  padding: 0 1rem;

  :hover {
    background-color: ${receiverTheme.colors.gray["100"]};
  }
`;

const RestOfTheMessages = styled(FirstMsgContainer)`
  min-height: 1.25rem;
  border-top: 2px solid #ffffff;

  :hover {
    background-color: ${receiverTheme.colors.gray["100"]};
  }
`;

const HoveredTimeContainer = styled.div`
  visibility: hidden;

  width: 2.8rem;

  ${RestOfTheMessages}:hover & {
    visibility: unset;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const XxsSizedTime = styled.div`
  ${textXsRegular};
  font-size: 0.5rem;
  color: ${receiverTheme.colors.gray["400"]};
`;

const StatusIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
`;

const MiddlePart = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`;

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MsgBundlesReceived = ({
  ensName,
  messages,
  isLoading,
}: {
  ensName: string;
  messages: Array<{
    time: string;
    content: string;
    senderAddress: EthAddress;
    id: string;
  }>;
  isLoading: boolean;
}) => {
  return (
    <Root>
      <FirstMsgContainer>
        <StatusIconContainer>
          <Avatar
            handle={messages[0].senderAddress}
            onClick={() => null}
            size="md"
          />
        </StatusIconContainer>
        <MiddlePart>
          <NameAndDate>
            <ENSName.EnsNameMonofontLg>{ensName}</ENSName.EnsNameMonofontLg>
            <Time.Root>{messages[0].time}</Time.Root>
          </NameAndDate>
          <MsgContainer>
            <MsgPreview isLoading={isLoading} msg={messages[0].content} />
          </MsgContainer>
        </MiddlePart>
      </FirstMsgContainer>

      {messages.slice(1).map((i, index) => (
        <RestOfTheMessages key={index}>
          <HoveredTimeContainer>
            <XxsSizedTime>{i.time}</XxsSizedTime>
          </HoveredTimeContainer>
          <MsgPreview isLoading={isLoading} msg={i.content} />
        </RestOfTheMessages>
      ))}
    </Root>
  );
};
