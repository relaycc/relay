import styled from "styled-components";

const Svg = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  
  :hover {
    path {
      fill: #FECDCA;
    }
  }
  
`;

export const RemoveIcon = () => (

        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12H16M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="#B42318" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
)

