import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {spaceMonoMdBold, textSmallRegular} from "@/lib/design/wip/typography";
import {Time} from "@/lib/design/Time";
import {PinIcon} from "@/lib/design/PinIcon";
import {LensIcon} from "@/lib/design/LensIcon";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;

  border: thin solid red;
  width: 360px;
  //width: 100%;
  background: #FFFFFF;

  :hover {
    background-color: ${receiverTheme.colors.gray["200"]};
  }
;

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
  width: 60%;
`;

const NameAndIcons = styled.div`
  display: flex;
  height: 1.5rem;
  column-gap: 4px;
`;

const Name = styled.div`
  ${spaceMonoMdBold};
  color: ${receiverTheme.colors.gray["900"]};
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 43%;
`;

const MessageDetails = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const StyledTime = styled.div`
  display: flex;
`;

export const Chat = ({
                         ENSName, statusIcon,
                         messageDetails, hasLoaded, isPinned, hasLENS
                     }: { ENSName: string, statusIcon: string; messageDetails: Array<{ message: string, time: string }>, hasLoaded: boolean, isPinned: boolean, hasLENS: boolean }) => {

    return (
        <Root>
            <Wrapper>
                <StatusIcon size={"lg"}
                            src={statusIcon}
                            isLoading={!hasLoaded}/>
                <MsgDetails>
                    <NameAndIcons>
                        <Name>{ENSName}</Name>
                        {hasLENS && <LensIcon isLoading={!hasLoaded}/>}
                        {isPinned && <PinIcon pinned={isPinned} isLoading={!hasLoaded}/>}
                    </NameAndIcons>
                    <MessageDetails>{messageDetails[0].message}</MessageDetails>
                </MsgDetails>
            </Wrapper>
            <StyledTime>
                <Time isLoading={!hasLoaded} time={messageDetails[0].time}/>
            </StyledTime>
        </Root>
    )
};