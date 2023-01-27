import styled from "styled-components";
export * from "@/design/relay/ButtonPrimary";
export * from "@/design/relay/Chevron";

export const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 80px;
`;

export const InnerWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export const NavLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 7rem;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  cursor: pointer;
  :hover {
    color: ${(p) => p.theme.colors.primary["500"]};
  }
`;
