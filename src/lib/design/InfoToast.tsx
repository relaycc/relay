import styled from "styled-components";
import { textSmallRegular } from "@/lib/design/wip/typography";
import { InfoToastIcon } from "@/lib/design/InfoToastIcon";

const InfoToastContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: #F2F4F7;
  border-bottom: 1px solid #D0D5DD;
  
`;

const InfoToastDescription = styled.div`
  ${textSmallRegular};
  font-weight: 500;
  color: #667085;
  gap: 0.25rem;
  
  svg{
    vertical-align: text-bottom;
  }
`


export const InfoToast = () => {
  return(
    <InfoToastContainer>
      <InfoToastDescription>{"Use the edit button to ignore or accept messages, restore any ignored message by clicking"} {<InfoToastIcon/>}</InfoToastDescription>
    </InfoToastContainer>
      );
};