import styled, {css} from "styled-components";

const Svg = styled.svg<{pinned : boolean}>`

  ${({pinned}) => pinned && css`
    path{
      transition: fill 150ms ease-in;
      fill: black;
  }
`};
  
  :hover{
    rect{
      transition: fill 150ms ease-in;
      fill: #EAECF0;
    }
  }
  
  :active{
    rect{
      transition: fill 150ms ease-in;
      fill: #D0D5DD;
    }
  }
`;

const LoadingImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
`;

export const PinIcon = ({pinned, isLoading}: {pinned:boolean, isLoading:boolean}) => (

    isLoading ?
        <LoadingImg />
    :
    <Svg pinned={pinned} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="white"/>
        <path d="M16.75 15.75L15.75 12.75H24.25L23.25 15.75V18C26.25 19 26.25 22.25 26.25 22.25H13.75C13.75 22.25 13.75 19 16.75 18V15.75Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 22.5V27.25" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>


)