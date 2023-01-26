import styled from "styled-components";
export * as Search from "./Search";

export const Title = styled.div`
  font-style: normal;
  font-weight: 900;
  font-size: 40px;
  line-height: 54px;
  text-align: center;
  /* Gray/900 */
  color: #101828; 
`

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

export const Directory = styled.button`
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

  :hover {
    transition: all 100ms ease-in;
    background: ${(props) => props.theme.colors.primary["100"]};;
    border: 2px solid ${(props) => props.theme.colors.primary["300"] };
  }
  :active {
    transition: all 100ms ease-in;
    background: ${(props) => props.theme.colors.primary["300"] };;
    border: 2px solid ${(props) => props.theme.colors.primary["300"] };
    color: white;
  }
`;




