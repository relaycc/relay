import { ComponentProps } from "react";
import styled from "styled-components";

export const ItalicIcon = styled(
  (props: ComponentProps<"svg"> & { isActive: boolean }) => (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 1H6M10 17H1M11 1L5 17"
        stroke="#344054"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
)``;
