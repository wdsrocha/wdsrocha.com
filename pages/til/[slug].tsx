import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { ContentRenderer } from "../../components/ContentRenderer";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts("til", ["slug"]);

  return {
    fallback: false,
    paths: posts.map(({ slug }) => ({
      params: { slug },
    })),
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({
  params,
}) => {
  if (typeof params?.slug !== "string") {
    return { notFound: true };
  }

  const post = await getPostBySlug("til", params?.slug, [
    "title",
    "date",
    "slug",
    "content",
  ]);

  return {
    props: {
      post,
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const canonicalUrl = `https://www.wdsrocha.com/til/${post.slug}`;

  return (
    <>
      <NextSeo title={`${post.title} | TIL`} canonical={canonicalUrl} />
      <p className="text-gray-11 text-base sm:text-xl italic">
        Published on <time dateTime={post.date}>{post.date}</time>
      </p>
      <ContentRenderer>{post.content}</ContentRenderer>
    </>
  );
};

export default Page;
