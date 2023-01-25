import { ComponentProps } from "react";
import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

export const CloseIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="40" height="40" rx="20" fill="white" />
    <path
      d="M26 14L14 26M14 14L26 26"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))`
  cursor: pointer;
 
  :hover {
    rect {
      transition: fill 150ms ease-in;
      fill: ${receiverTheme.colors.gray["100"]};
    }
  }

  :active {
    rect {
      transition: fill 150ms ease-in;
      fill: ${receiverTheme.colors.gray["300"]};
    }
  }
`;
