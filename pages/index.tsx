import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
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

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  description,
  content,
}) => {
  return (
    <>
      <NextSeo description={description} />
      <ContentRenderer size="xl">{content}</ContentRenderer>
    </>
  );
};

export default Page;
