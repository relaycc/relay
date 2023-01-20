import styled, {css} from "styled-components";
import {spaceMonoMdBold, textMdSemiBold, textXlSemibold} from "@/lib/design/wip/typography";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";

const Name = styled.div<{ size: "lg" | "md", monoFont: boolean }>`
  color: ${receiverTheme.colors.gray["900"]};

  overflow: clip;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 80%;

  ${({size}) => size === "lg" && css`
    ${textXlSemibold};
  `}

  ${({size}) => size === "md" && css`
    ${textMdSemiBold};
  `}

  ${props => props.monoFont && props.size && css`
    ${spaceMonoMdBold};

    ${props.size === "lg" && css`
      font-size: 1rem;
    `}

    ${props.size === "md" && css`
      font-size: 0.875rem;
    `};
  `};
`;

const Loading = styled.div<{ size: "lg" | "md", monoFont: boolean }>`
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 6px;

  ${({size}) => size === "lg" && css`
    width: 7.5rem;
    height: 1.5rem;
  `}

  ${({size}) => size === "md" && css`
    width: 5.313rem;
    height: 1.125rem;
  `}

  ${props => props.monoFont && props.size && css`

    ${props.size === "lg" && css`
      width: 7.5rem;
      height: 1.125rem;
    `}

    ${props.size === "md" && css`
      width: 5.313rem;
      height: 1rem;
    `};
  `};
`;

export const ENSName = ({
                            size,
                            monoFont,
                            isLoading,
                            ENSname
                        }: { size: "lg" | "md", monoFont: boolean, isLoading: boolean, ENSname: string }) => {

    return (

        isLoading ?
            <Loading size={size} monoFont={monoFont}/>
            :
            <Name size={size} monoFont={monoFont}>{ENSname}</Name>

    )

}


