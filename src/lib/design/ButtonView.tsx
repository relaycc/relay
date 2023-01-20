import styled, { css } from "styled-components";
import { ReactNode } from "react";
import { textMdSemiBold } from "@/lib/design/wip/typography";

const StyledButton = styled.button<{
  hierarchy: "primary" | "secondary",
  size: "sm" | "md" | "lg" | "xl" | "2xl",
  disabled: boolean,
}>`
  ${({size}) => {
    switch (size) {
      case "sm":
        return css`
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          font-style: normal;
          vertical-align: middle;
        `;
      case "md":
        return css`
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
          font-style: normal;
          vertical-align: middle;
        `;
      case "lg":
        return css`
          ${textMdSemiBold};
        `;
      case "xl":
        return css`
          ${textMdSemiBold};
        `;
      default:
        return css`
          font-size: 18px;
          font-weight: 600;
          line-height: 28px;
          font-style: normal;
          vertical-align: middle;
        `;
    }
  }}
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  gap: 0.5rem;
  border: 2px solid #4236C7;
  border-radius: ${(props) => props.theme.radius.m};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  padding: ${({size}) => {
    switch (size) {
      case "sm":
        return "8px 14px 8px 14px";
      case "md":
        return "10px 16px 10px 16px";
      case "lg":
        return "10px 18px 10px 18px";
      case "xl":
        return "12px 20px 12px 20px"; 
      default:
        return "16px 28px 16px 28px";
    }
  }};
  color: ${({hierarchy}) => {
    switch (hierarchy) {
      case "secondary":
        return (props) => props.theme.colors.primary["700"];
      default:
        return "#FFFFFF";
    }
  }};
  background-color: ${({hierarchy}) => {
    switch (hierarchy) {
      case "secondary":
        return "#FFFFFF";
      default:
        return (props) => props.theme.colors.primary["500"];
    }
  }};
  
  :hover {
    background-color: ${({hierarchy}) => {
      switch (hierarchy) {
        case "secondary":
          return "#EFEEFB";
        default:
          return (props) => props.theme.colors.primary["700"];
      }
    }};
  }
  
  :active {
    background-color: ${({hierarchy}) => {
      switch (hierarchy) {
        case "secondary":
          return (props) => props.theme.colors.primary["100"];
        default:
          return (props) => props.theme.colors.primary["500"];
      }
    }};
  }
  
  ${({disabled}) => disabled && css`
    opacity: 0.2;
    pointer-events: none;
    cursor: not-allowed;
  `}
`

interface ButtonViewProps {
  hierarchy: "primary" | "secondary";
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  label: string;
  handleClick: () => void;
  disabled: boolean;
  icon?: ReactNode;
}

export const ButtonView = ({hierarchy, size, label, handleClick, disabled, icon}: ButtonViewProps) => {
  return (
    <StyledButton size={size} hierarchy={hierarchy} onClick={handleClick} disabled={disabled}>{label}{icon && icon}</StyledButton>
  )
}