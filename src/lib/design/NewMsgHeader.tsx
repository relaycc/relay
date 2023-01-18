import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {CloseIcon} from "@/lib/design/CloseIcon";
import {displayXsBold} from "@/lib/design/wip/typography";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${receiverTheme.colors.gray["200"]};
  padding: 0.5rem 1rem;
  height: 5rem;


  background: #FFFFFF;
  width: 100%;
`;

const Label = styled.div`
  ${displayXsBold};
  color: ${receiverTheme.colors.gray["900"]};
`;


export const NewMsgHeader = () => (
    <Root>
        <Label>New Message</Label>
        <CloseIcon/>
    </Root>
)
