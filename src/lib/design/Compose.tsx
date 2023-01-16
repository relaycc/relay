import styled from "styled-components";

const Svg = styled.svg`
  :hover {
    rect {
      fill: #F2F4F7;
    }
  }
  :active {
    rect {
      fill: #D0D5DD;
    }
  } 
`

export const Compose = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="20" fill="white"/>
      <path d="M20 16V24M16 20H24M30 20C30 25.5228 25.5228 30 20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  )
}