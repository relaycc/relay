import styled from "styled-components";
import {textSmallRegular} from "./typography";
import {receiverTheme} from "@/design/receiverTheme";

export {MsgRequestsIcon} from "@/design/MsgRequestsIcon";
export * as MsgPreview from "@/design/MsgPreview";
export * as Badge from "@/design/Badge";
export * as ENSName from "@/design/ENSName";


export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  column-gap: 16px;
  background-color: ${receiverTheme.colors.gray["25"]};
  height: 4.5rem;

  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0;
  column-gap: 24px;

  max-width: 80%;
`;

export const RequestDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`;


export const StyledMsgRequest = styled(MsgPreview.MsgContainer)`
  ${textSmallRegular};
  color: ${receiverTheme.colors.gray["500"]};
  margin: 0;
  padding: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  max-width: 80%;
`;


// export default function Requests() {
//     const existingRequest = useState(false);
//     const existingUnreadReq = useState(false);
//
//     return (
//         <Root>
//             <Wrapper>
//                 <MsgRequestsIcon/>
//                 <RequestDetails>
//
//                     if (isLoading){
//                         return  <ENSName.LoadingEnsNameLg />
//                     } else {
//                         return <ENSName.EnsNameMd> Message Requests </ENSName.EnsNameMd>
//                     }
//
//                     {existingRequest &&
//                         if (isLoading){
//                             return <MsgPreview.MsgLoading/>
//                         } else {
//                         return <StyledMsgRequest>   From me and her and him and they and ....   </StyledMsgRequest>
//                         }
//                     }
//                 </RequestDetails>
//             </Wrapper>
//
//             {existingUnreadReq &&
//                 if (isLoading){
//                     return  <Badge hasLoaded={false} label={"unread"} color={"purple"} dot={true}/>
//                 } else {
//                     return <Badge hasLoaded={true} label={"unread"} color={"purple"} dot={true}/>
//                 }
//             }
//
//         </Root>
//
//     )
// }
