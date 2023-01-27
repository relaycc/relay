import styled from "styled-components";
import {receiverTheme} from "@/design/receiverTheme";
import {ReactNode} from "react";

export const DropdownItemRoot = styled.div`
  display: flex;
  column-gap: 9.5px;
  align-items: center;
`;

export const IconContainer = styled.div`
  width: 18px;
  height: 18px;
`;

export const DropdownItemText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  align-self: flex-start;
  color: ${receiverTheme.colors.gray["900"]};
  cursor: pointer;
  padding: 8px;
  height: 2.375rem;
`;

export default function DropdownItem({
                                         icon,
                                         itemName,
                                         onClick
                                     }: { icon: ReactNode, itemName: string, onClick: () => unknown }) {
    return (
        <DropdownItemRoot>
            {icon &&
                <IconContainer/>
            }
            <DropdownItemText onClick={onClick}>{itemName}</DropdownItemText>
        </DropdownItemRoot>
    );
}