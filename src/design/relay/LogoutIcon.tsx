import styled from "styled-components";
import { ComponentProps } from "react";

export const LogoutIcon = styled((props: ComponentProps<"svg">) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.75 14.75H2.75C2.35218 14.75 1.97064 14.592 1.68934 14.3107C1.40804 14.0294 1.25 13.6478 1.25 13.25V2.75C1.25 2.35218 1.40804 1.97064 1.68934 1.68934C1.97064 1.40804 2.35218 1.25 2.75 1.25H5.75M11 11.75L14.75 8M14.75 8L11 4.25M14.75 8H5.75"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))`
  stroke: #101828;
`;
