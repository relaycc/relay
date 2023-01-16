import styled from "styled-components";

const Svg = styled.svg`
  width: 2.5rem;
  height: 2.5rem;
  
  :hover{
    rect{
      fill: #F2F4F7;
    }
  }
  
  :active{
    rect{
      fill: #D5D0DD;
    }
  }
`;

export const Close = () => (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="white"/>
        <path d="M26 14L14 26M14 14L26 26" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>

)