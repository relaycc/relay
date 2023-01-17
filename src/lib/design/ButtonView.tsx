import styled, { css } from "styled-components";
import { ReactNode } from "react";

const StyledButton = styled.button<{
  hierarchy: "primary" | "secondary",
  size: "sm" | "md" | "lg" | "xl" | "2xl",
  disabled: boolean,
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  gap: 0.5rem;
  border-radius: ${(props) => props.theme.radius.m};
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
  font-size: ${({size}) => {
    switch (size) {
      case "sm":
        return "14px";
      case "md":
        return "14px";
      case "lg":
        return "16px";
      case "xl":
        return "16px";
      default:
        return "18px";
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
  border: ${({hierarchy}) => {
    switch (hierarchy) {
      case "secondary":
        return "1px solid #FFFFFF";
      default:
        return "1px solid #4236C7";
    }
  }};
  box-shadow: ${({hierarchy}) => {
    switch (hierarchy) {
      case "secondary":
        return "0 1px 2px rgba(16, 24, 40, 0.05)";
      default:
        return "0 1px 2px rgba(16, 24, 40, 0.05)";
    }
  }};
  
  :hover {
    background-color: ${({hierarchy}) => {
      switch (hierarchy) {
        case "secondary":
          return "#F9F5FF";
        default:
          return (props) => props.theme.colors.primary["700"];
      }
    }};
    border: ${({hierarchy}) => {
      switch (hierarchy) {
        case "secondary":
          return "1px solid #F9F5FF";
        default:
          return "1px solid #4236C7";
      }
    }};
  }
  
  :active {
    background-color: ${({hierarchy}) => {
      switch (hierarchy) {
        case "secondary":
          return "#FFFFFF";
        default:
          return (props) => props.theme.colors.primary["500"];
      }
    }};
    box-shadow: ${({hierarchy}) => {
      switch (hierarchy) {
        case "secondary":
          return "none";
        default:
          return "0 1px 2px rgba(16, 24, 40, 0.05), 0 0 0 4px #F4EBFF";
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
    <StyledButton size={size} hierarchy={hierarchy} onClick={handleClick} disabled={disabled}>{label}{icon}</StyledButton>
  )
}