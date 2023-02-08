import styled from "styled-components";

export * from "@/design/relay/ButtonPrimary";
export * from "@/design/relay/Chevron";
export * from "@/design/relay/Search";

const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 2rem;
  height: 80px;
`;

export const RootDesktop = styled(Root)`
  display: none;
  @media (min-width: 415px) {
    display: flex;
  }
`;

export const RootMobile = styled(Root)`
  display: flex;
  @media (min-width: 415px) {
    display: none;
  }
  justify-content: space-between;
`;

export const InnerWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export const NavLink = styled.div`
  position: relative;
  display: none;
  align-items: center;
  justify-content: center;
  max-width: 7rem;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  height: 40px;
  cursor: pointer;
  @media (min-width: 950px) {
    display: flex;
  }

  :hover {
    color: ${(p) => p.theme.colors.primary["500"]};
  }
`;
export const NavLinkActive = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 7rem;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  height: 40px;
  cursor: pointer;
  color: ${(p) => p.theme.colors.primary["500"]};
`;
export const DropdownCard = styled.div`
  position: relative;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  margin-top: 0.5rem;
  color: ${(p) => p.theme.colors.gray["900"]};
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
  padding: 8px;
  background-color: #efeefb;
  min-height: 2.8rem;
`;
export const LogoAndNameWrapper = styled.div`
  display: none;
  align-items: center;
  @media (min-width: 950px) {
    display: flex;
  }
`;
export const MobileMenuButtonWrapper = styled.div`
  display: none;
  align-items: center;
  @media (max-width: 949px) {
    display: flex;
  }
`;
