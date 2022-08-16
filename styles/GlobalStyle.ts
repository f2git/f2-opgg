import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import Colors from './Colors';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    margin-left: calc(100vw - 100%);
    background-color: ${Colors.background};
    font-family: 'NanumSquare', sans-serif;
    .normal {
      font-weight: 400;
    }
    .bold {
      font-weight: 700;
    }
    .bolder {
      font-weight: 800;
    }
    .light {
      font-weight: 300;
    }
  }
  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  a {
    color: none !important;
    text-decoration: none;
    box-shadow: none;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`;

export default GlobalStyle;
