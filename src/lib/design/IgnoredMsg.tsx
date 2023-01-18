import styled from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";
import {DropdownIcon} from "@/lib/design/DropdownIcon";
import {textSmallBold} from "@/lib/design/wip/typography";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${receiverTheme.colors.gray["100"]};
  padding: 10px 16px;
  border-top: 1px solid ${receiverTheme.colors.gray["300"]};
  border-bottom: 1px solid ${receiverTheme.colors.gray["300"]};

  width: 100%;
`;

const Label = styled.div`
  ${textSmallBold};
  color: ${receiverTheme.colors.gray["900"]};
`;

export const IgnoredMsg = ({label}: { label: string }) => {

    return (
        <Root>
            <Label>{label}</Label>
            <DropdownIcon isOpen={false}/>
        </Root>
    )

}