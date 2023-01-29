import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Satoshi-Regular';
    src: url('/fonts/Satoshi-Regular.woff2') format('woff2'),
        url('/fonts/Satoshi-Regular.woff') format('woff');
        font-weight: 400;
        font-display: swap;
        font-style: normal;
  }

  @font-face {
  font-family: 'Satoshi-Medium';
  src: url('/fonts/Satoshi-Medium.woff2') format('woff2'),
       url('/fonts/Satoshi-Medium.woff') format('woff');
       font-weight: 500;
       font-display: swap;
       font-style: normal;
  }

  @font-face {
  font-family: 'Satoshi-Bold';
  src: url('/fonts/Satoshi-Bold.woff2') format('woff2'),
       url('/fonts/Satoshi-Bold.woff') format('woff');
       font-weight: 700;
       font-display: swap;
       font-style: normal;
  }

  @font-face {
  font-family: 'Satoshi-Black';
  src: url('/fonts/Satoshi-Black.woff2') format('woff2'),
       url('/fonts/Satoshi-Black.woff') format('woff');
       font-weight: 700;
       font-display: swap;
       font-style: normal;
  }


  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  * {
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden;
  }
`;
