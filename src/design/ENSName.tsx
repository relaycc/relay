import styled, { css } from 'styled-components';
import {
  spaceMonoMdBold,
  textMdSemiBold,
  textXlSemibold,
} from '@/design/typography';
import { receiverTheme } from '@/design/receiverTheme';

const name = css`
  color: ${receiverTheme.colors.gray['900']};
  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 15rem;
`;

const loadingName = css`
  background: linear-gradient(
    90deg,
    #f1efef -24.18%,
    #f9f8f8 50.26%,
    #e7e5e5 114.84%
  );
  mix-blend-mode: multiply;
  border-radius: 6px;
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
  color: ${receiverTheme.colors.primary['500']};
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

export const LoadingEnsNameLg = styled.div`
  ${loadingName};
  ${lg};
`;

export const LoadingEnsNameMd = styled.div`
  ${loadingName};
  ${md};
`;

export const LoadingEnsNameMonofontLg = styled.div`
  ${loadingName};
  ${lg};
  ${monoFont};
  ${monoFontLg};
`;

export const LoadingEnsNameMonofontMd = styled.div`
  ${loadingName};
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
