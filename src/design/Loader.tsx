import styled from "styled-components";

//When using this component make sure to use a container with the height, width and border radius of the component it's Loading

export const Loader = styled.div`
  width: 100%;
  height: 100%;
  background: rgb(249, 248, 248);
  background: linear-gradient(
    90deg,
    #f9f8f8 0%,
    rgba(231, 229, 229, 1) 48%,
    rgba(249, 248, 248, 1) 100%
  );
  background-size: 200%;
  animation: move 2000ms ease-in-out infinite;

  @keyframes move {
    0% {
      background-position: 100%;
    }
    100% {
      background-position: -100%;
    }
  }
`;
