import { ComponentProps } from "react";
import styled from "styled-components";

export const CodeIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="22"
    height="14"
    viewBox="0 0 22 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 13L21 7L15 1M7 1L1 7L7 13"
      stroke="#344054"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))``;
