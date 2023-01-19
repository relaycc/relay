import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {Checkbox, CheckboxSvg} from "@/lib/design/Checkbox";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {spaceMonoMdBold, textSmallRegular} from "@/lib/design/wip/typography";
import {Time} from "@/lib/design/Time";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;

  bordeR: thin solid red;
  width: 360px;
  //width: 100%;
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
  justify-content: flex-start;
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
  width: 80%;
`;
const Name = styled.div`
  ${spaceMonoMdBold};
  color: ${receiverTheme.colors.gray["900"]};
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 90%;
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
                            ENSName,
                            statusIcon,
                            messageDetails, isLoading
                        }: { isEditing: boolean, ENSName: string, statusIcon: string, messageDetails: Array<{ message: string, time: string }>, isLoading: boolean }) => {

    return (
        <Root>
            <Wrapper>
                {isEditing && <Checkbox selected={false}/>}
                <StatusIcon size={"lg"}
                            src={statusIcon}
                            isLoading={isLoading}/>
                <RequestDetails>
                    <Name>{ENSName}</Name>
                    <Message>{messageDetails[0].message}</Message>
                </RequestDetails>
            </Wrapper>
            <TimeWrapper>
                <Time isLoading={isLoading} time={messageDetails[0].time}/>
            </TimeWrapper>
        </Root>
    )
};