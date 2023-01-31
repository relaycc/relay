import { ComponentProps } from "react";
import styled, { css } from "styled-components";

const Base = styled((props: ComponentProps<"svg">) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_520_11105)">
      <circle cx="20" cy="20" r="18" stroke="#98A2B3" strokeWidth="4" />
      <circle cx="20" cy="15" r="6.5" stroke="#98A2B3" strokeWidth="3" />
      <path
        d="M29.966 30.933C30.8835 30.4665 31.1305 29.2662 30.3512 28.5937C29.3034 27.6897 28.0673 26.926 26.6909 26.3376C24.6381 25.46 22.3384 25.0002 20.0014 25C17.6645 24.9998 15.3647 25.4593 13.3117 26.3365C11.935 26.9247 10.6987 27.6882 9.65062 28.5922C8.87119 29.2644 9.11803 30.4647 10.0354 30.9314C10.7076 31.2733 11.5183 31.0909 12.0779 30.5854C12.8971 29.8455 13.8803 29.2238 14.9838 28.7524C16.5235 28.0944 18.2484 27.7499 20.0011 27.75C21.7538 27.7501 23.4786 28.095 25.0181 28.7532C26.1214 29.2248 27.1044 29.8465 27.9234 30.5865C28.483 31.0922 29.2937 31.2748 29.966 30.933Z"
        fill="#98A2B3"
      />
    </g>
    <defs>
      <clipPath id="clip0_520_11105">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
))``;

export const Active = styled(Base)`
  circle:first-child {
    transition: all 150ms ease-in;
    fill: #4236c7;
    stroke: #4236c7;
  }
  circle {
    transition: all 150ms ease-in;
    stroke: #ffffff;
    fill: #4236c7;
  }
  path {
    transition: fill 150ms ease-in;
    fill: #ffffff;
  }
`;

export const Inactive = styled(Base)`
  :hover {
    circle {
      transition: stroke 150ms ease-in;
      stroke: #4236c7;
    }
    path {
      transition: fill 150ms ease-in;
      fill: #4236c7;
    }
  }
`;

export const ProfileIcon = styled(Base)<{active:boolean}>`
  ${({active})=> active && css`
    ${Active}
  `}
  ${Inactive}
`;
