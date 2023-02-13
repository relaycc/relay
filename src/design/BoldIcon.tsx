import { ComponentProps } from "react";
import styled from "styled-components";

export const BoldIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2 10H10C11.0609 10 12.0783 9.57857 12.8284 8.82843C13.5786 8.07828 14 7.06087 14 6C14 4.93913 13.5786 3.92172 12.8284 3.17157C12.0783 2.42143 11.0609 2 10 2H2V10ZM2 10H11C12.0609 10 13.0783 10.4214 13.8284 11.1716C14.5786 11.9217 15 12.9391 15 14C15 15.0609 14.5786 16.0783 13.8284 16.8284C13.0783 17.5786 12.0609 18 11 18H2V10Z"
      stroke="#344054"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))``;
