import styled from "styled-components";
import {receiverTheme} from "@/design/receiverTheme";
import {Checkbox, CheckboxSvg} from "@/design/Checkbox";
import {textSmallRegular} from "@/design/typography";

export * as Time from "@/design/Time";
export * as ENSName from "@/design/ENSName";
export * as Avatar from "@/components/Avatar";
export * as MsgPreview from "@/design/MsgPreview"

export const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 4.5rem;

  width: 100%;
  background: #ffffff;

  :hover {
    background-color: ${receiverTheme.colors.gray["200"]};

    ${CheckboxSvg} {
      rect {
        fill: ${receiverTheme.colors.gray["200"]};
      }

      path {
        stroke: ${receiverTheme.colors.gray["200"]};
      }

      path:first-child {
        stroke: ${receiverTheme.colors.gray["900"]};
      }
    }
  }

  :active {
    background-color: ${receiverTheme.colors.gray["300"]};

    ${CheckboxSvg} {
      rect {
        fill: ${receiverTheme.colors.gray["300"]};
      }

      path {
        stroke: ${receiverTheme.colors.gray["300"]};
      }
    }
  }
`;

export const RequestDetails = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  column-gap: 24px;

  max-width: 80%;
`;

export const MsgDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  max-width: 55%;
`;

export const NameContainer = styled.div`
  max-width: 100%;
`;

export const StyledMsgPreview = styled(MsgPreview.MsgContainer)`
  ${textSmallRegular};
`;

export const TimeWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// export const Request = ({
//                             isEditing,
//                             ENSname,
//                             statusIcon,
//                             messageDetails,
//                             hasLoaded,
//                         }: {
//     isEditing: boolean;
//     ENSname: string;
//     statusIcon: string;
//     messageDetails: Array<{ message: string; time: string }>;
//     hasLoaded: boolean;
// }) => {
//     return (
//         <Root>
//             <RequestDetails>

//                 {isEditing && <Checkbox selected={false}/>}

//                 <Avatar handle={''} onClick={() => {
//                 }} size={"lg"}/>

//                 <MsgDetails>
//                     <NameContainer>
//                         <ENSName.EnsNameMonofontMd>{ENSname}</ENSName.EnsNameMonofontMd>
//                     </NameContainer>
//                     <StyledMsgPreview>{messageDetails[0].message}</StyledMsgPreview>
//                 </MsgDetails>

//             </RequestDetails>

//             <TimeWrapper>
//                 <Time.Root>{messageDetails[0].time}</Time.Root>
//             </TimeWrapper>
//         </Root>
//     );
// };
