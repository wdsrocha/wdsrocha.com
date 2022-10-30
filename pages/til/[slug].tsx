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
import { Post, getPosts, getPostBySlug } from "../../lib/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

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

  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { slug, title, description, date, content } = post;
  const canonicalUrl = `${BASE_URL}/til/${slug}`;

  return (
    <>
      <NextSeo
        title={`${title} | TIL`}
        description={description}
        canonical={canonicalUrl}
        twitter={{
          cardType: "summary",
          handle: "@wdsrocha",
          site: "@wdsrocha",
        }}
      />
      <p className="text-gray-11 text-base sm:text-xl italic">
        Published on <time dateTime={date}>{date}</time>
      </p>
      <ContentRenderer>{content}</ContentRenderer>
    </>
  );
};

export default Page;
