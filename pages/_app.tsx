import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/Layout";
import "tailwindcss/tailwind.css";
import "./styles.css";
import { DefaultSeo } from "next-seo";
import { defaultSeoConfig } from "../lib/seo.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
export default MyApp;
