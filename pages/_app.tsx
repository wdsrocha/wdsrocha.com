import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { createGlobalStyle, css } from "styled-components";

// `css` is used due to a Prettier bug when used with `createGlobalStyle`
// https://github.com/styled-components/vscode-styled-components/issues/175
const GlobalStyle = createGlobalStyle`${css`
  /* CSS Reset: https://courses.joshwcomeau.com/css-for-js/treasure-trove/010-global-styles */

  /* 1. Use a more-intuitive box-sizing model. */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 2. Remove default margin for common elements */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  figure,
  blockquote,
  ul,
  ol,
  dl,
  dt,
  dd {
    margin: 0;
  }

  /* 3. Allow percentage-based heights in the application */
  html,
  body,
  #__next {
    height: 100%;
  }

  /* 4. Improve the typography across the site. */
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* 5. Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* 6. Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* 7. Create a root stacking context */
  #__next {
    isolation: isolate;
  }
`}`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
