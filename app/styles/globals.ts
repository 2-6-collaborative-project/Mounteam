'use client';

import { createGlobalStyle } from 'styled-components';
import normalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  :root {
    --black-000000: #000000;
    --black-171717: #171717;
    --black-333236: #333236;
    --black-4B4B4B: #4B4B4B;
    --gray-787486: #787486;
    --gray-9FA6B2: #9FA6B2;
    --gray-D9D9D9: #D9D9D9;
    --gray-EEEEEE: #EEEEEE;
    --gray-FAFAFA: #FAFAFA; 
    --white-FFFFFF: #FFFFFF;
    --violet-5534DA: #5534DA;
    --violet-8-percent: #F1EFFD;
    --red-D6173A: #D6173A;
    --green-7AC555: #7AC555;
    --purple-760DDE: #760DDE;
    --orange-FFA500: #FFA500;
    --blue-76A6EA: #76A5EA;
    --pink-E876EA: #E876EA;
  }

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
