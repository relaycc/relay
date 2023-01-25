import styled from "styled-components";
import {ComponentProps} from "react";
import {receiverTheme} from "@/design/receiverTheme";

export const IconChevronDown = styled((props: ComponentProps<"svg">) => (

    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 9L12 15L18 9" stroke="#101828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

))`
  cursor: pointer;

  :hover {
    path {
      stroke: ${receiverTheme.colors.primary["500"]};
    }
  }`;

// // in the Figma it changes color only on hover - I leave it here if it changes to onClick
// export const OpenIconChevronDown = styled(IconChevronDown)`
//   path {
//     stroke: ${receiverTheme.colors.primary["500"]};
//   }
// `;