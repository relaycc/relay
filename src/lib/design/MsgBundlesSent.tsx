import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {spaceMonoMdBold, textSmallRegular, textXsRegular} from "@/lib/design/wip/typography";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {Time} from "@/lib/design/Time";

const Root = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #FFFFFF;
  margin-top: 1.4rem;

  width: 360px;
  //width: 100%;
  min-height: 2.75rem;

  :hover {
    background-color: ${receiverTheme.colors.gray["100"]};
  }
`;


const FirstMsgContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 0.5rem;
  padding: 0 1rem;
`;

const RestOfTheMessages = styled(FirstMsgContainer)`
  min-height: 1.25rem;
  border-top: 2px solid #FFFFFF;
`;

const HoveredTimeContainer = styled.div`
  visibility: hidden;

  width: 2.5rem;

  ${Root}:hover & {
    visibility: unset;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const StyledTime = styled(Time)`
  font-size: 0.5rem;
  line-height: 0.5rem;
`;

const StatusIconContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5rem;
`;

const EnsName = styled.div`
  ${spaceMonoMdBold};
  font-size: 14px;
  line-height: 20px;
  color: ${receiverTheme.colors.primary["500"]};
`;

const Date = styled.div`
  ${textXsRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Msg = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["900"]};
`;

export const MsgBundlesSent = (
    {
        ensName,
        messages,
        isLoading
    }: {
        ensName: string,
        messages: Array<{ time: string, message: string }>,
        statusIcon: string,
        isLoading: boolean
    }) => {

    return (
        <Root>
            <FirstMsgContainer>
                <StatusIconContainer>
                    <StatusIcon size={"lg"} src={""} isLoading={isLoading}/>
                </StatusIconContainer>
                <MainContainer>
                    <NameAndDate>
                        <EnsName>{ensName}</EnsName>
                        <Date>{messages[0].time}</Date>
                    </NameAndDate>
                    <MsgContainer>
                        <Msg>{messages[0].message}</Msg>
                    </MsgContainer>
                </MainContainer>

            </FirstMsgContainer>
            {messages.slice(1).map((i, index) => (
                <RestOfTheMessages key={index}>
                    <HoveredTimeContainer>
                        <StyledTime isLoading={isLoading} time={i.time}/>
                    </HoveredTimeContainer>
                    <Msg>{i.message}</Msg>
                </RestOfTheMessages>
            ))}
        </Root>
    )
}
