import styled from "styled-components";
import {ComponentProps} from "react";

const ChevronRight = styled((props: ComponentProps<"svg">) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 30L25 20L15 10" stroke="#101828" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>

))`
  cursor: pointer;
  `;

const ChevronLeft = styled((props: ComponentProps<"svg">) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M25 10L15 20L25 30" stroke="#101828" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
))`
  cursor: pointer;
  `;

export const ChevronRightActive = styled(ChevronRight)``;
export const ChevronRightInactive = styled(ChevronRight)`
  cursor: not-allowed;
  pointer-events: none;
  path {
    stroke: ${(props) => props.theme.colors.gray["300"]};
  }
`;
export const ChevronLeftActive = styled(ChevronLeft)``;
export const ChevronLeftInactive = styled(ChevronLeft)`
  cursor: not-allowed;
  pointer-events: none;
  path {
    stroke: ${(props) => props.theme.colors.gray["300"]};
  }
`;


