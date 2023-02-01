import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const FooterLink = styled.a`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  color: ${receiverTheme.colors.gray["300"]};
  cursor: pointer;

  :hover {
    color: ${receiverTheme.colors.accent["300"]};
  }
`;
