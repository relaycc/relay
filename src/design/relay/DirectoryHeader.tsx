import styled from "styled-components";
export * as Search from "./Search";
import { textXxlBlack } from "../typography";

export const Title = styled.div`
  ${textXxlBlack};
  text-align: center;
  color: ${(props) => props.theme.colors.gray["900"]};
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
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
