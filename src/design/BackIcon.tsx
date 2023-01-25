import styled from "styled-components";
import { ComponentProps } from "react";

export const BackIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="44" height="44" rx="22" fill="white" />
    <path
      d="M29 22H15M15 22L22 29M15 22L22 15"
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
      fill: #eaecf0;
    }
  }
  :active {
    rect {
      transition: fill 150ms ease-in;
      fill: #d0d5dd;
    }
  }
`;
