import styled from "styled-components";

export const DropdownItem = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  align-self: flex-start;
  color: ${(p) => p.theme.colors.gray["900"]};
  cursor: pointer;
  padding: 8px;
  height: 2.375rem;
  display: flex;
  align-items: center;
  border-radius: 8px;
  min-width: 9rem;

  :hover {
    color: ${(p) => p.theme.colors.primary["500"]};
    background: #ffffff;
  }
`;
