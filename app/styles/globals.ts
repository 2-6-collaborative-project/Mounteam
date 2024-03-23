'use client';

import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  * {
  margin: 0;
  padding: 0;
  border:none;
  box-sizing: border-box;
  text-decoration: none;
  }

  html, body {
    font-size: 62.5%;
  }

  ul, ol {
    list-style: none;
  }

  button, a {
    cursor: pointer;
    color: inherit;
  }
`;

export default GlobalStyle;
