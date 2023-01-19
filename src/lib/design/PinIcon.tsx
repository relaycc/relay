import styled, {css} from "styled-components";
import {receiverTheme} from "@/lib/design/wip/receiverTheme";

const Svg = styled.svg<{ pinned: boolean }>`

  ${({pinned}) => pinned && css`
    path {
      fill: ${receiverTheme.colors.gray["900"]};
    }
  `};
`;

const LoadingImg = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
`;

export const PinIcon = ({pinned, hasLoaded}: { pinned: boolean, hasLoaded: boolean }) => (

    hasLoaded ?

        <Svg pinned={pinned} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.75 7.75L7.75 4.75H16.25L15.25 7.75V10C18.25 11 18.25 14.25 18.25 14.25H5.75C5.75 14.25 5.75 11 8.75 10V7.75Z"
                stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14.5V19.25" stroke="#101828" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </Svg>

        :
        <LoadingImg/>

)