import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import Colors from './Colors';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${Colors.background};
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
