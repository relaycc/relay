import styled from "styled-components";
import { textXsMedium } from "../typography";
export * as Search from "./Search";
import { textXlBlack, textXxlBlack } from "../typography";
export { MenuIcon } from "./MenuIcon";

export const Title = styled.div`
  ${textXlBlack};
  text-align: center;
  color: ${(props) => props.theme.colors.gray["900"]};
  margin-top: 1rem;

  @media screen and (min-width: 400px) {
    ${textXxlBlack};
    margin-top: 0;
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

export const DirectoryRoot = styled(Root)`
  max-width: 100%;
  display: none;

  @media screen and (min-width: 718px) {
    display: flex;
    max-width: 40rem;
  }

  @media screen and (min-width: 1210px) {
    display: flex;
    max-width: 100%;
  }
`;

export const MobileRoot = styled(Root)`
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.colors.gray["200"]};
  gap: 1rem;

  @media screen and (min-width: 400px) {
    display: flex;
    background: #fff;
  }

  @media screen and (min-width: 718px) {
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
`;

export const Nav = styled.nav`
  display: none;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 718px) {
    display: flex;
  }
`;

export const Directories = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0;

  @media screen and (min-width: 718px) {
    justify-content: center;
  }
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

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  align-self: flex-start;
  padding: 0 1rem;
`;

export const CategoryTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray["600"]};
  ${textXsMedium};
  margin-right: 0.25rem;
`;

export const ActiveCategoryTitle = styled(CategoryTitle)`
  color: ${({ theme }) => theme.colors.primary["300"]};
`;
