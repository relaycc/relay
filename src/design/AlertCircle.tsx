import styled from "styled-components";
import { ComponentProps } from "react";

export const AlertCircle = styled((props: ComponentProps<"svg">) => (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="44" height="44" rx="22" fill="#FEF3F2" />
      <path
        d="M22 18V22M22 26H22.01M32 22C32 27.5228 27.5228 32 22 32C16.4772 32 12 27.5228 12 22C12 16.4772 16.4772 12 22 12C27.5228 12 32 16.4772 32 22Z"
        stroke="#D92D20"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>
  ))``;