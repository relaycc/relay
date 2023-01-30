import styled from "styled-components";
import { ComponentProps } from "react";

export const CloseIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13 1L1 13M1 1L13 13"
          stroke="#101828"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>

))``;
