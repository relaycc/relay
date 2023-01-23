import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";
import { StatusIcon } from "@/design/StatusIcon";
import { textSmallRegular } from "@/design/typography";
import { Time } from "@/design/Time";
import { PinIcon } from "@/design/PinIcon";
import { LensIcon } from "@/design/LensIcon";
import { ENSName } from "@/design/ENSName";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;

  width: 100%;
  background: #ffffff;

  :hover {
    background-color: ${receiverTheme.colors.gray["200"]};
  }
  :active {
    background-color: ${receiverTheme.colors.gray["300"]};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  column-gap: 24px;

  min-width: 65%;
  max-width: 80%;
`;

const MsgDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 70%;
`;

const NameAndIcons = styled.div`
  display: flex;
  height: 1.5rem;
  column-gap: 4px;
  max-width: 100%;
`;

const MessageDetails = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const StyledTime = styled.div`
  display: flex;
`;

export const Chat = ({
  ENSname,
  statusIcon,
  messageDetails,
  hasLoaded,
  isPinned,
  hasLENS,
}: {
  ENSname: string;
  statusIcon: string;
  messageDetails: Array<{ message: string; time: string }>;
  hasLoaded: boolean;
  isPinned: boolean;
  hasLENS: boolean;
}) => {
  return (
    <Root>
      <Wrapper>
        <StatusIcon size={"lg"} src={statusIcon} isLoading={!hasLoaded} />
        <MsgDetails>
          <NameAndIcons>
            <ENSName
              size={"md"}
              monoFont={true}
              isLoading={!hasLoaded}
              ENSname={ENSname}
            />
            {hasLENS && <LensIcon isLoading={!hasLoaded} />}
            {isPinned && <PinIcon pinned={isPinned} hasLoaded={hasLoaded} />}
          </NameAndIcons>
          <MessageDetails>{messageDetails[0].message}</MessageDetails>
        </MsgDetails>
      </Wrapper>
      <StyledTime>
        <Time isLoading={!hasLoaded} time={messageDetails[0].time} />
      </StyledTime>
    </Root>
  );
};
