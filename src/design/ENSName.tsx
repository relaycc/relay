import styled, {css} from "styled-components";
import {
    spaceMonoMdBold,
    textMdSemiBold,
    textXlSemibold,
} from "@/design/typography";
import {receiverTheme} from "@/design/receiverTheme";

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

const primaryColor = css`
  color: ${receiverTheme.colors.primary["500"]};
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

export const EnsNameMonofontLgColored = styled.div`
  ${name};
  ${lg};
  ${monoFont};
  ${monoFontLg};
  ${primaryColor};
`;

