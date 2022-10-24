import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/Layout";
import "tailwindcss/tailwind.css";
import { DefaultSeo } from "next-seo";
import { defaultSeoConfig } from "../lib/seo.config";
import { Analytics } from "../components/Analytics";

import "./styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </>
  );
}
export default MyApp;
