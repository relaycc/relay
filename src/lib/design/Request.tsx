import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {Checkbox, CheckboxSvg} from "@/lib/design/Checkbox";
import {StatusIcon} from "@/lib/design/StatusIcon";
import {spaceMonoMdBold, textSmallRegular} from "@/lib/design/wip/typography";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;

  width: 100%;
  //width: 400px;
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

  min-width: 65%;
  max-width: 85%;
`;

const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  width: 60%;
`;
const ENSName = styled.div`
  ${spaceMonoMdBold};
  color: ${receiverTheme.colors.gray["900"]};
`;
const MessageDetails = styled.div`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["400"]};
`;
const Time = styled.div`
  ${textSmallRegular};
  font-size: 12px;
  line-height: 18px;
  color: ${receiverTheme.colors.gray["400"]};

`;

export const Request = ({isEditing}: { isEditing: boolean }) => {

    return (
        <Root>
            <Wrapper>
                {isEditing && <Checkbox selected={false}/>}
                <StatusIcon size={"lg"}
                            src={""}
                            isLoading={false}/>
                <RequestDetails>
                    <ENSName>request.eth</ENSName>
                    <MessageDetails>This is a request msg.</MessageDetails>
                </RequestDetails>
            </Wrapper>
            <Time>YESTERDAY</Time>
        </Root>
    )
};