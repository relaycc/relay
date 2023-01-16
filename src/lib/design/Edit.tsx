import styled, { css } from "styled-components";

const Svg = styled.svg<{active: boolean}>`
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

    ${({active}) => active && css`
        rect {
            fill: #4236C7;
        }
        path {
            stroke: #FFFFFF;
        }
        
        :hover{
            rect {
                fill: #4236C7;
            }
            path {
                stroke: #FFFFFF;
            }   
        }
        :active {
            rect {
                fill: #4236C7;
            }
            path {
                stroke: #FFFFFF;
            }
        }
  `}
`

export const Edit = ({active}: {active: boolean}) => {
    return (
        <Svg active={active} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="20" fill="white"/>
    <path d="M20 28H29M24.5 11.5C24.8978 11.1022 25.4374 10.8787 26 10.8787C26.2786 10.8787 26.5544 10.9335 26.8118 11.0402C27.0692 11.1468 27.303 11.303 27.5 11.5C27.697 11.697 27.8532 11.9308 27.9598 12.1882C28.0665 12.4456 28.1213 12.7214 28.1213 13C28.1213 13.2786 28.0665 13.5544 27.9598 13.8118C27.8532 14.0692 27.697 14.303 27.5 14.5L15 27L11 28L12 24L24.5 11.5Z" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</Svg>
    )
}