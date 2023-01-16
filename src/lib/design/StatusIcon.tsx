import styled, {css} from "styled-components";

const Svg = styled.svg<{size: string}>`
  ${({size}) => size==="lg" && css`
    width: 2.5rem;
    height: 2.5rem;
  `}
  
  ${({size}) => size==="md" && css`
    width: 2.25rem;
    height: 2.25rem;
  `}

  ${({size}) => size==="sm" && css`
    width: 1.5rem;
    height: 1.5rem;
  `}
`;

export const StatusIcon = ({size}: {size: string}) => {

    return(

        <Svg size={size} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="40" height="40" rx="20" fill="url(#pattern0)"/>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_454_10832" transform="scale(0.015625)"/>
                </pattern>
                <image id="image0_454_10832" width="64" height="64" xlinkHref="data:image/png;base64,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"/>
            </defs>
        </Svg>



    )

}