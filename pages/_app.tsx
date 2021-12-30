import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/Layout";
import { createGlobalStyle, css } from "styled-components";
import { colors } from "../lib/constants";
import "tailwindcss/tailwind.css";
import "./styles.css";

// `css` is used due to a Prettier bug when used with `createGlobalStyle`
// https://github.com/styled-components/vscode-styled-components/issues/175
const GlobalStyle = createGlobalStyle`${css`
  /* CSS Reset based on:
   * https://courses.joshwcomeau.com/css-for-js/treasure-trove/010-global-styles */

  /* Use a more-intuitive box-sizing model. */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Allow percentage-based heights in the application */
  html,
  body,
  #__next {
    padding: 0;
    margin: 0;
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  /* Create a root stacking context */
  #__next {
    isolation: isolate;
  }

  /* Improve the typography across the site. */
  body {
    line-height: 1.5;
  }

  /* 5. Make images easier to work with */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  ol,
  ul {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    outline-color: ${colors.outline};
  }

  body {
    outline-color: ${colors.outline};
    color: ${colors.text};
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
