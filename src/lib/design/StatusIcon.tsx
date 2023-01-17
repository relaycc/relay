import styled, {css} from "styled-components";

const Img = styled.div<{size: "lg" | "3xl" | "sm", src: string}>`
  background: url(${({src}) => src});
  border-radius: 29px;
  
  ${({size}) => size==="lg" && css`
    width: 2.5rem;
    height: 2.5rem;
  `}
  
  ${({size}) => size==="3xl" && css`
    width: 7.5rem;
    height: 7.5rem;
  `}

  ${({size}) => size==="sm" && css`
    width: 1.5rem;
    height: 1.5rem;
  `}
`;

const LoadingSvg = styled.div<{size: "lg" | "3xl" | "sm"}>`
  background: linear-gradient(90deg, #F1EFEF -24.18%, #F9F8F8 50.26%, #E7E5E5 114.84%);
  border-radius: 75px;

  ${({size}) => size==="lg" && css`
    width: 2.5rem;
    height: 2.5rem;
  `}

  ${({size}) => size==="3xl" && css`
    width: 7.5rem;
    height: 7.5rem;
  `}

  ${({size}) => size==="sm" && css`
    width: 1.5rem;
    height: 1.5rem;
  `}
`;

export const StatusIcon = ({size, src, isLoading}: {size: "lg" | "3xl" | "sm", src: string, isLoading:boolean}) => {

    return(

        isLoading ?
            <LoadingSvg size={size} />
            :
            <Img size={size} src={src} />

    )

}


