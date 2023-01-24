import { ComponentProps } from "react";
import styled from "styled-components";
import { receiverTheme } from "@/design/receiverTheme";

const Compose = styled((props: ComponentProps<"svg">) => (
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
      d="M20 16V24M16 20H24M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20Z"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))`
  cursor: pointer;
`;

export const Active = styled(Compose)`
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

export const Inactive = styled(Compose)`
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.2;
`;
