import styled, { css } from "styled-components";
import { ComponentProps } from "react";



export const DropdownIcon = styled((props: ComponentProps<"svg"> & {isOpen: boolean}) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M9 18L15 12L9 6" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  ))`
  ${({isOpen}) => isOpen && css`
    path {
      transition: transform 150ms ease-in;
      transform: rotate(90deg);
      transform-origin: 50% 50%;
    }
`};`