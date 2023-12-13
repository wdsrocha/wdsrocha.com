import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { ContentRenderer } from "../../components/ContentRenderer";
import { BASE_URL } from "../../lib/constants";
import { Post, getPosts, getPostByFilename } from "../../lib/posts";
import dayjs from "dayjs";
import { formatDate } from "../../lib/common";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    fallback: false,
    paths: posts.map(({ name }) => ({
      params: { name },
    })),
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params,
}) => {
  if (typeof params?.name !== "string") {
    return { notFound: true };
  }

  const post = await getPostByFilename(`${params.name}.md`);

  return {
    props: {
      post,
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { name, title, description, date, content } = post;
  const canonicalUrl = `${BASE_URL}/blog/${name}`;

  return (
    <>
      <NextSeo
        title={`${title} | Blog`}
        description={description}
        canonical={canonicalUrl}
        twitter={{
          cardType: "summary",
          handle: "@wdsrocha",
          site: "@wdsrocha",
        }}
      />
      <p className="text-base italic text-gray-11 sm:text-xl">
        Published on <time dateTime={date}>{formatDate(date)}</time>
      </p>
      <ContentRenderer>{content}</ContentRenderer>
    </>
  );
};

export default Page;
