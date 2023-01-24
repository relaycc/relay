import styled from "styled-components";
import { ComponentProps } from "react";



const DropdownIcon = styled((props: ComponentProps<"svg">) => (
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
  `

export const Open = styled(DropdownIcon)`
`;


export const Close = styled(DropdownIcon)`
  path {
    transition: transform 150ms ease-in;
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  }
`;