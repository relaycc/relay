import styled, { css } from "styled-components";
import {
  spaceMonoMdBold,
  textMdSemiBold,
  textXlSemibold,
} from "@/design/typography";
import { receiverTheme } from "@/design/receiverTheme";

const name = css`
  color: ${receiverTheme.colors.gray["900"]};
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;
`;
const lg = css`
  ${textXlSemibold};
`;

const md = css`
  ${textMdSemiBold};
`;

const monoFont = css`
  ${spaceMonoMdBold};
`;

const monoFontLg = css`
  font-size: 1rem;
`;

const monoFontMd = css`
  font-size: 0.875rem;
`;

export const EnsNameLg = styled.div`
  ${name};
  ${lg};
`;

export const EnsNameMd = styled.div`
  ${name};
  ${md};
`;

export const EnsNameMonofontLg = styled.div`
  ${name};
  ${lg};
  ${monoFont};
  ${monoFontLg};
`;

export const EnsNameMonofontMd = styled.div`
  ${name};
  ${md};
  ${monoFont};
  ${monoFontMd};
`;

const Name = styled.div<{ size: "lg" | "md"; monoFont: boolean }>`
  color: ${receiverTheme.colors.gray["900"]};

  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;

  ${({ size }) =>
    size === "lg" &&
    css`
      ${textXlSemibold};
    `}

  ${({ size }) =>
    size === "md" &&
    css`
      ${textMdSemiBold};
    `}

  ${(props) =>
    props.monoFont &&
    props.size &&
    css`
      ${spaceMonoMdBold};

      ${props.size === "lg" &&
      css`
        font-size: 1rem;
      `}

      ${props.size === "md" &&
      css`
        font-size: 0.875rem;
      `};
    `};
`;

const Loading = styled.div<{ size: "lg" | "md"; monoFont: boolean }>`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  border-radius: 6px;

  ${({ size }) =>
    size === "lg" &&
    css`
      width: 7.5rem;
      height: 1.5rem;
    `}

  ${({ size }) =>
    size === "md" &&
    css`
      width: 5.313rem;
      height: 1.125rem;
    `}

  ${(props) =>
    props.monoFont &&
    props.size &&
    css`
      ${props.size === "lg" &&
      css`
        width: 7.5rem;
        height: 1.125rem;
      `}

      ${props.size === "md" &&
      css`
        width: 5.313rem;
        height: 1rem;
      `};
    `};
`;

export const ENSName = ({
  size,
  monoFont,
  isLoading,
  ENSname,
}: {
  size: "lg" | "md";
  monoFont: boolean;
  isLoading: boolean;
  ENSname: string;
}) => {
  return isLoading ? (
    <Loading size={size} monoFont={monoFont} />
  ) : (
    <Name size={size} monoFont={monoFont}>
      {ENSname}
    </Name>
  );
};
