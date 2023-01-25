import styled from "styled-components";
import {IconChevronDown} from "@/pages/design/relay/IconChevronDown";
import {receiverTheme} from "@/design/receiverTheme";
import * as DropdownItem from "@/pages/design/relay/DropdownItem";
import {useState} from "react";
import {DropdownItemRoot} from "@/pages/design/relay/DropdownItem";

export * as DropdownItem from "@/pages/design/relay/DropdownItem";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  //width: 100%;
  max-width: 9rem;
`;

export const NavNameAndIcon = styled.div`
  display: flex;
  column-gap: 6px;
  align-items: center;
  justify-content: center;

  max-width: 7rem;
`;

export const NavName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;

  :hover {
    color: ${receiverTheme.colors.primary["500"]};
  }
;
`;

export const StyledChevron = styled(IconChevronDown)`
  ${NavNameAndIcon}:hover & {
    path {
      stroke: ${receiverTheme.colors.primary["500"]};
    }
  }
`;

export const DropdownItemContainer = styled(DropdownItemRoot)<{ open: boolean }>`
  display: ${({open}) => (open ? "flex" : "none")};
  position: relative;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  margin-top: 0.5rem;

  color: ${receiverTheme.colors.gray["900"]};
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  padding: 8px;

  background-color: #EFEEFB;
  min-height: 2.8rem;

  width: 9rem;
`;


export const LinkCommunity = () => {
    const CommunityLinks = ["Discord", "Twitter", "Lens", "Mirror"];
    const [open, setOpen] = useState<boolean>(false);
    const close = () => setOpen(false);

    const openDropdown = () => {
        if (!open) {
            setOpen(true);
        } else setOpen(false);
    };

    const closeDropdown = () => {
        if (!open) {
            setOpen(true);
        } else setOpen(false);
    };

    return (
        <Root>
            <NavNameAndIcon onMouseEnter={() => openDropdown()} onMouseLeave={() => closeDropdown()}>
                <NavName>Community</NavName>
                <StyledChevron/>
            </NavNameAndIcon>


            <DropdownItemContainer open={open}>

                {CommunityLinks.map((i: string, index) =>
                    <DropdownItem.DropdownItemText key={index}
                                                   onClick={() => close()}>{i}</DropdownItem.DropdownItemText>
                )}

            </DropdownItemContainer>
        </Root>
    )
}
