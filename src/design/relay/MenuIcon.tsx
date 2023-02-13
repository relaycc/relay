import styled from "styled-components";
import { ComponentProps } from "react";

export const MenuIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M6 12H18M3 6H21M9 18H15"
      stroke="#101828"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))`
  cursor: pointer;
`;
