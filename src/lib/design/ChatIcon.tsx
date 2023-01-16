import styled, {css} from "styled-components";

const Svg = styled.svg<{active:boolean}>`
  width: 2.5rem;
  height: 2.5rem;
  
  :hover {
    path {
      stroke: #4236C7;
    }
  }
  
  ${({active}) => active && css`
    
    path{
      fill: white;
      stroke:white;
    }

    path:first-child {
      fill: #4236c7;
      stroke:#4236c7;
    }
    
    :hover {
      path{
        fill: white;
        stroke:white;
      }

      path:nth-child(1) {
        fill: #4236c7;
        stroke:#4236c7;
      }
    }
  `}
`;

export const ChatIcon = ({active}: {active:boolean}) => {
    
    return(

    <Svg active={active} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M3.31179 25.773L3.31173 25.7729C2.49099 23.979 2 21.8229 2 19.2414C2 13.6757 4.27892 9.96606 7.55565 7.58299C10.915 5.13983 15.4652 4 20 4C24.5348 4 29.085 5.13983 32.4443 7.58299C35.7211 9.96606 38 13.6757 38 19.2414C38 24.807 35.7211 28.5167 32.4443 30.8998C29.085 33.3429 24.5348 34.4828 20 34.4828C18.6391 34.4828 17.267 34.3796 15.921 34.1662C15.0381 34.0261 14.0906 34.0042 13.1316 34.1841L4.28389 35.8431C3.75959 35.9414 3.30008 35.4819 3.39841 34.9575L4.12172 31.0999L2.15597 30.7313L4.12172 31.0999C4.48653 29.1542 4.00632 27.2913 3.31179 25.773Z"
                stroke="#98A2B3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill={""} />
            <path
                d="M13.1035 19.2414C13.1035 20.003 12.4859 20.6207 11.7242 20.6207C10.9624 20.6207 10.3448 20.003 10.3448 19.2414C10.3448 18.4797 10.9624 17.8621 11.7242 17.8621C12.4859 17.8621 13.1035 18.4797 13.1035 19.2414Z"
                fill="#98A2B3" stroke="#98A2B3" strokeWidth="2.75862" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M21.3793 19.2414C21.3793 20.003 20.7617 20.6207 20 20.6207C19.2384 20.6207 18.6207 20.003 18.6207 19.2414C18.6207 18.4797 19.2384 17.8621 20 17.8621C20.7617 17.8621 21.3793 18.4797 21.3793 19.2414Z"
                fill="#98A2B3" stroke="#98A2B3" strokeWidth="2.75862" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M29.6552 19.2414C29.6552 20.003 29.0376 20.6207 28.2759 20.6207C27.5143 20.6207 26.8966 20.003 26.8966 19.2414C26.8966 18.4797 27.5143 17.8621 28.2759 17.8621C29.0376 17.8621 29.6552 18.4797 29.6552 19.2414Z"
                fill="#98A2B3" stroke="#98A2B3" strokeWidth="2.75862" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
    )

}