import { ComponentProps } from "react";
import styled from "styled-components";

export const ArrowUpCircle = styled(
  (props: ComponentProps<"svg"> & { isActive: boolean }) => {
    const { isActive, ...componentProps } = props;
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...componentProps}
      >
        <path
          d="M16 12L12 8M12 8L8 12M12 8V16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#98A2B3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
)<{ isActive: boolean }>`
  path {
    stroke: ${({ theme, isActive }) => isActive && theme.colors.gray["600"]};
  }
`;
