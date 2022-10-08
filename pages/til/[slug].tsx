import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
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
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <time className="text-gray-700" dateTime={post.date}>
          {post.date}
        </time>
      </header>
      <ContentRenderer size="xl">{post.content}</ContentRenderer>
    </article>
  );
};

export default Page;
