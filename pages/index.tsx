import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { ContentRenderer } from "../components/ContentRenderer";
import { getHome, Home } from "../lib/posts";

export const getStaticProps: GetStaticProps<{
  home: Home;
}> = async () => {
  return {
    props: {
      home: await getHome(),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  home,
}) => {
  const { content, description } = home;
  const canonicalUrl = `https://www.wdsrocha.com`;
  return (
    <>
      <NextSeo description={description} canonical={canonicalUrl} />
      <ContentRenderer>{content}</ContentRenderer>
    </>
  );
};

export default Page;
