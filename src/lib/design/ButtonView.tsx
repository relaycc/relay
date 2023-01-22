import styled, { css } from "styled-components";
import { ReactNode } from "react";
import { textMdSemiBold } from "@/lib/design/wip/typography";

const primary = css`
  color: #ffffff;
  background-color: ${(p) => p.theme.colors.primary["500"]};
  :hover {
    background-color: ${(p) => p.theme.colors.primary["700"]};
  }
  :active {
    background-color: ${(p) => p.theme.colors.primary["500"]};
  }
`;

const secondary = css`
  color: ${(p) => p.theme.colors.primary["700"]};
  background-color: ${(p) => p.theme.colors.primary["500"]};
  :hover {
    background-color: #ffffff;
  }
  :active {
    background-color: ${(p) => p.theme.colors.primary["100"]};
  }
`;

const small = css`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  font-style: normal;
  vertical-align: middle;
  padding: 8px 14px 8px 14px;
`;

const md = css`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  font-style: normal;
  vertical-align: middle;
  padding: 10px 16px 10px 16px;
`;

const lg = css`
  ${textMdSemiBold};
  padding: 10px 18px 10px 18px;
`;

const xl = css`
  ${textMdSemiBold};
  padding: 12px 20px 12px 20px;
`;

const xxl = css`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  font-style: normal;
  vertical-align: middle;
  padding: 16px 28px 16px 28px;
`;

const button = css`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  gap: 0.5rem;
  border: 2px solid #4236c7;
  border-radius: ${(props) => props.theme.radius.m};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  :disabled {
    opacity: 0.2;
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export const ButtonPrimarySm = styled.button`
  ${button};
  ${primary};
  ${small};
`;
export const ButtonPrimaryMd = styled.button`
  ${button};
  ${primary};
  ${md};
`;
export const ButtonPrimaryLg = styled.button`
  ${button};
  ${primary};
  ${lg};
`;
export const ButtonPrimaryXl = styled.button`
  ${button};
  ${primary};
  ${xl};
`;
export const ButtonPrimaryXxl = styled.button`
  ${button};
  ${primary};
  ${xxl};
`;

export const ButtonSecondarySm = styled.button`
  ${button};
  ${secondary};
  ${small};
`;
export const ButtonSecondaryMd = styled.button`
  ${button};
  ${secondary};
  ${md};
`;
export const ButtonSecondaryLg = styled.button`
  ${button};
  ${secondary};
  ${lg};
`;
export const ButtonSecondaryXl = styled.button`
  ${button};
  ${secondary};
  ${xl};
`;
export const ButtonSecondaryXxl = styled.button`
  ${button};
  ${secondary};
  ${xxl};
`;

const StyledButton = styled.button<{
  hierarchy: "primary" | "secondary";
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  disabled: boolean;
}>`
  ${({ size }) => {
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
  border: 2px solid #4236c7;
  border-radius: ${(props) => props.theme.radius.m};
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  padding: ${({ size }) => {
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
  color: ${({ hierarchy }) => {
    switch (hierarchy) {
      case "secondary":
        return (props) => props.theme.colors.primary["700"];
      default:
        return "#FFFFFF";
    }
  }};
  background-color: ${({ hierarchy }) => {
    switch (hierarchy) {
      case "secondary":
        return "#FFFFFF";
      default:
        return (props) => props.theme.colors.primary["500"];
    }
  }};

  :hover {
    background-color: ${({ hierarchy }) => {
      switch (hierarchy) {
        case "secondary":
          return "#EFEEFB";
        default:
          return (props) => props.theme.colors.primary["700"];
      }
    }};
  }

  :active {
    background-color: ${({ hierarchy }) => {
      switch (hierarchy) {
        case "secondary":
          return (props) => props.theme.colors.primary["100"];
        default:
          return (props) => props.theme.colors.primary["500"];
      }
    }};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.2;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

interface ButtonViewProps {
  hierarchy: "primary" | "secondary";
  size: "sm" | "md" | "lg" | "xl" | "2xl";
  label: string;
  handleClick: () => void;
  disabled: boolean;
  icon?: ReactNode;
}

export const ButtonView = ({
  hierarchy,
  size,
  label,
  handleClick,
  disabled,
  icon,
}: ButtonViewProps) => {
  return (
    <StyledButton
      size={size}
      hierarchy={hierarchy}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
      {icon && icon}
    </StyledButton>
  );
};
