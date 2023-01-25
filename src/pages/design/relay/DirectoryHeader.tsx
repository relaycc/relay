import styled from "styled-components";
export * as Search from "./Search";

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

export const Directory = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.gray["800"]};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
`;


