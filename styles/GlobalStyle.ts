import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
  }
  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle}
`;

export default GlobalStyle;
