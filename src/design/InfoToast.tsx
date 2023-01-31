import styled from "styled-components";
import { textSmallRegular } from "@/design/typography";
import { InfoToastIcon } from "@/design/InfoToastIcon";

export const InfoToastContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: #f2f4f7;
  border-bottom: 1px solid #d0d5dd;
`;

export const InfoToastDescription = styled.div`
  ${textSmallRegular};
  font-weight: 500;
  color: #667085;
  gap: 0.25rem;

  svg {
    vertical-align: text-bottom;
  }
`;

// export const InfoToast = () => {
//   return (
//     <InfoToastContainer>
//       <InfoToastDescription>
//         {
//           "Use the edit button to ignore or accept messages, restore any ignored message by clicking"
//         }{" "}
//         {<InfoToastIcon />}
//       </InfoToastDescription>
//     </InfoToastContainer>
//   );
// };
