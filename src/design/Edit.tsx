import styled, { css } from "styled-components";
import { ComponentProps } from "react";


export const Edit = styled((props: ComponentProps<"svg"> & {isActive: boolean}) =>(
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="40" height="40" rx="20" fill="white"/>
    <path d="M20 28H29M24.5 11.5C24.8978 11.1022 25.4374 10.8787 26 10.8787C26.2786 10.8787 26.5544 10.9335 26.8118 11.0402C27.0692 11.1468 27.303 11.303 27.5 11.5C27.697 11.697 27.8532 11.9308 27.9598 12.1882C28.0665 12.4456 28.1213 12.7214 28.1213 13C28.1213 13.2786 28.0665 13.5544 27.9598 13.8118C27.8532 14.0692 27.697 14.303 27.5 14.5L15 27L11 28L12 24L24.5 11.5Z"
          stroke="#101828"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"/>
</svg>
    ))`
  ${({isActive}) => isActive ? css`
        rect {
          transition: fill 150ms ease-in;
          fill: #4236C7;
        }
        path {
          transition: stroke 150ms ease-in;
          stroke: #FFFFFF;
        }
  ` : css`
        :hover {
            rect {
              transition: fill 150ms ease-in;
              fill: #F2F4F7;
            }
        }
        :active {
            rect {
                transition: fill 150ms ease-in;
                fill: #D0D5DD;
            }
        }
    `}`;