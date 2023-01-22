import styled from "styled-components";

const Svg = styled.svg<{ onClick: () => unknown }>`
  cursor: pointer;
`;

export const LogoMirror = ({onClick}: { onClick: () => unknown }) => (
    <Svg onClick={onClick} width="31" height="40" viewBox="0 0 31 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
              d="M6.85726 2.94371C1.68829 7.39294 0.759399 10.9519 0.759399 26.3184V40H15.6422H30.5251V25.7232C30.5251 9.53462 29.4535 5.74574 23.8801 2.22247C18.7758 -1.00475 11.0645 -0.677196 6.85726 2.94371Z"
              fill="#344054"/>
    </Svg>


);
