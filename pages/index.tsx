import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { ContentRenderer } from "../components/ContentRenderer";
import { Title } from "../components/Title";
import { Post, getAllPosts, convertMarkdownToHtml } from "../lib/api";

export const getStaticProps: GetStaticProps<{ content: string }> =
  async () => ({
    props: {
      content: await convertMarkdownToHtml("home"),
    },
  });

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  content,
}) => {
  return (
    <>
      <Head>
        <title>wdsrocha&apos;s homepage</title>
        <meta name="description" content="wdsrocha's homepage" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Title>{"Hello there 👋"}</Title>

      <ContentRenderer>{content}</ContentRenderer>
    </>
  );
};

export default Page;
