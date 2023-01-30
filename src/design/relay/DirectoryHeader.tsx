import styled from "styled-components";
export * as Search from "./Search";
import { textXlBlack, textXxlBlack } from "../typography";
export { MenuIcon } from "./MenuIcon";

export const Title = styled.div`
  ${textXlBlack};
  text-align: center;
  color: ${(props) => props.theme.colors.gray["900"]};

  @media screen and (min-width: 400px) {
    ${textXxlBlack};
  }
`;

export const Root = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media screen and (min-width: 400px) {
    display: flex;
  }
`;

export const MobileRoot = styled(Root)`
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.gray["200"]};

  @media screen and (min-width: 400px) {
    display: none;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

export const Nav = styled.nav`
  display: none;
  flex-direction: column;
  width: 100%;
  overflow: auto;

  @media screen and (min-width: 400px) {
    display: flex;
  }
`;

export const Directories = styled.ul`
  display: flex;
  flex-direction: row;
`;

const Directory = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray["800"]};
  white-space: nowrap;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  border-radius: 24px;
  border: 2px solid white;
  background-color: white;
  transition: all 100ms ease-out;
`;

export const Active = styled(Directory)`
  transition: all 100ms ease-in;
  background: ${(props) => props.theme.colors.primary["300"]};
  border: 2px solid ${(props) => props.theme.colors.primary["300"]};
  color: white;
`;

export const Inactive = styled(Directory)`
  :hover {
    transition: all 100ms ease-in;
    background: ${(props) => props.theme.colors.primary["100"]};
    border: 2px solid ${(props) => props.theme.colors.primary["300"]};
  }
`;

export const MobileActive = styled(Active)`
  border-radius: 8px;
`;

export const MobileInactive = styled(Inactive)`
  border: 2px solid grey;
  background: #f9fafb;
  border-radius: 8px;
  border-color: #f9fafb;
`;
