import { ComponentProps } from "react";
import styled, { css } from "styled-components";
const Svg = styled.svg<{ active: boolean }>`
  ${({ active }) => (active ? css`` : css``)}
`;
const Base = styled((props: ComponentProps<"svg">) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.31182 25.7748C2.49106 23.9808 2 21.8243 2 19.2426C2 13.6765 4.27898 9.96649 7.55571 7.58324C10.915 5.13991 15.4652 4 20 4C24.5348 4 29.085 5.13991 32.4443 7.58324C35.721 9.96649 38 13.6765 38 19.2426C38 24.8088 35.721 28.5188 32.4443 30.902C29.085 33.3454 24.5348 34.4853 20 34.4853C18.6391 34.4853 17.267 34.3821 15.921 34.1687C15.0381 34.0286 14.0906 34.0066 13.1315 34.1866L4.28386 35.8457C3.75979 35.944 3.30002 35.4847 3.39841 34.9599L4.12172 31.1019C4.48652 29.1562 4.00633 27.2932 3.31182 25.7748Z"
      stroke="#98A2B3"
      strokeWidth="4"
      // fill={active ? "#4236c7" : "#ffffff"}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.1034 19.2424C13.1034 20.0042 12.4858 20.6219 11.7241 20.6219C10.9623 20.6219 10.3447 20.0042 10.3447 19.2424C10.3447 18.4807 10.9623 17.863 11.7241 17.863C12.4858 17.863 13.1034 18.4807 13.1034 19.2424Z"
      fill="#98A2B3"
      stroke="#98A2B3"
      strokeWidth="2.75862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.3792 19.2424C21.3792 20.0042 20.7616 20.6219 19.9999 20.6219C19.2383 20.6219 18.6206 20.0042 18.6206 19.2424C18.6206 18.4807 19.2383 17.863 19.9999 17.863C20.7616 17.863 21.3792 18.4807 21.3792 19.2424Z"
      // fill="#98A2B3"
      stroke="#98A2B3"
      strokeWidth="2.75862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29.6551 19.2424C29.6551 20.0042 29.0375 20.6219 28.2758 20.6219C27.5142 20.6219 26.8965 20.0042 26.8965 19.2424C26.8965 18.4807 27.5142 17.863 28.2758 17.863C29.0375 17.863 29.6551 18.4807 29.6551 19.2424Z"
      fill="#98A2B3"
      stroke="#98A2B3"
      strokeWidth="2.75862"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <clipPath id="clip0_939_18569">
        <rect width="40" height="40" fill="white" />
      </clipPath>
    </defs>
  </svg>
))``;

export const Active = styled(Base)`
  path {
    fill: "#4236c7";
    stroke: #4236c7;
  }
  path:nth-of-type(2) {
    fill: "#4236c7";
    stroke: #ffffff;
  }
  path:nth-of-type(3) {
    stroke: #ffffff;
  }
  path:nth-of-type(4) {
    fill: "#4236c7";
    stroke: #ffffff;
  }
  path:nth-of-type(5) {
    fill: "#4236c7";
    stroke: #4236c7;
  }
`;

export const Inactive = styled(Base)`
  :hover {
    path {
      transition: fill 150ms ease-in;
      fill: #ffffff;
      stroke: #4236c7;
    }
  }
`;
