import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { ContentRenderer } from "../../../components/ContentRenderer";
import { getSimplePage, SimplePage } from "../../../lib/tina";

export const getStaticProps: GetStaticProps<{
  privacyPage: SimplePage;
}> = async () => {
  return {
    props: {
      privacyPage: await getSimplePage("freestyle-app/privacy.md"),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  privacyPage,
}) => {
  const { content, description } = privacyPage;
  const canonicalUrl = `https://www.wdsrocha.com/freestyle/privacy`;
  return (
    <>
      <NextSeo description={description} canonical={canonicalUrl} />
      <ContentRenderer>{content}</ContentRenderer>
    </>
  );
};

export default Page;
