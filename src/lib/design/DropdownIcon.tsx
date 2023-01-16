import styled, { css } from "styled-components";

const Svg = styled.svg<{isOpen: boolean}>`
  ${({isOpen}) => isOpen && css`
    path {
      transition: transform 150ms ease-in;
      transform: rotate(90deg);
      transform-origin: 50% 50%;
    }
`}
`

export const DropdownIcon = ({isOpen}: {isOpen: boolean}) => {
  return (
    <Svg isOpen={isOpen} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>

  )
}