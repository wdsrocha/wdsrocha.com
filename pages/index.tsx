import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { ContentRenderer } from "../components/ContentRenderer";
import { convertMarkdownToHtml, getHomeDescription } from "../lib/api";

export const getStaticProps: GetStaticProps<{
  description: string;
  content: string;
}> = async () => ({
  props: {
    description: getHomeDescription(),
    content: await convertMarkdownToHtml("home"), // make links external
  },
});

const Favicon = () => (
  <>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
  </>
);

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  description,
  content,
}) => {
  return (
    <>
      <Head>
        <title>Wesley Rocha (@wdsrocha)</title>
        <meta name="description" content={description} />
        <Favicon />
      </Head>
      <ContentRenderer size="xl">{content}</ContentRenderer>
    </>
  );
};

export default Page;
