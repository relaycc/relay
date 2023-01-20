import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {Checkbox, CheckboxSvg} from "@/lib/design/Checkbox";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {textSmallRegular} from "@/lib/design/wip/typography";
import {Time} from "@/lib/design/Time";
import {ENSName} from "@/lib/design/ENSName";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;

  width: 100%;
  background: #FFFFFF;

  :hover {
    background-color: ${receiverTheme.colors.gray["200"]};

    ${CheckboxSvg} {
      rect {
        fill: ${receiverTheme.colors.gray["200"]}
      }

      path {
        stroke: ${receiverTheme.colors.gray["200"]};
      }

      path:first-child {
        stroke: ${receiverTheme.colors.gray["900"]};
      }
    }
  ;
  }

  :active {
    background-color: ${receiverTheme.colors.gray["300"]};

    ${CheckboxSvg} {
      rect {
        fill: ${receiverTheme.colors.gray["300"]}
      }

      path {
        stroke: ${receiverTheme.colors.gray["300"]};
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  column-gap: 24px;

  max-width: 80%;
`;

const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 55%;
`;

const NameContainer = styled.div`
  max-width: 100%;
`;

const Message = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Request = ({
                            isEditing,
                            ENSname,
                            statusIcon,
                            messageDetails, hasLoaded
                        }: { isEditing: boolean, ENSname: string, statusIcon: string, messageDetails: Array<{ message: string, time: string }>, hasLoaded: boolean }) => {

    return (
        <Root>
            <Wrapper>
                {isEditing && <Checkbox selected={false}/>}
                <StatusIcon size={"lg"}
                            src={statusIcon}
                            isLoading={!hasLoaded}/>
                <RequestDetails>
                    <NameContainer>
                        <ENSName size={"md"} monoFont={true} isLoading={!hasLoaded} ENSname={ENSname}/>
                    </NameContainer>
                    <Message>{messageDetails[0].message}</Message>
                </RequestDetails>
            </Wrapper>
            <TimeWrapper>
                <Time isLoading={!hasLoaded} time={messageDetails[0].time}/>
            </TimeWrapper>
        </Root>
    )
};