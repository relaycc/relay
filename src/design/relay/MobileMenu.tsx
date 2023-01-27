import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const MobileMenu = () => {
  return (
    <MenuIconContainer>
      <svg width="20" height="14" viewBox="0 0 20 14">
        <path
          d="M1 7H15M1 1H19M1 13H19"
          stroke={receiverTheme.colors.gray[900]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </MenuIconContainer>
  );
};

export const MenuIconContainer = styled.button`
  height: 32px;
  width: 32px;
  display: grid;
  place-content: center;
  border-radius: 4px;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;

  :active {
    background-color: ${receiverTheme.colors.gray[200]};
  }
`;
