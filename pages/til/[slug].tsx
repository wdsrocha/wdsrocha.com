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
    "description",
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
  const { slug, title, description, date, content } = post;
  const canonicalUrl = `https://www.wdsrocha.com/til/${slug}`;

  return (
    <>
      <NextSeo
        title={`${title} | TIL`}
        description={description}
        canonical={canonicalUrl}
        openGraph={{
          title,
          description,
          images: [
            {
              url: "https://www.wdsrocha.com/apple-touch-icon.png",
              width: 180,
              height: 180,
              alt: "Capital letter W written in cursive form along side a pink background.",
              type: "image/png",
            },
          ],
        }}
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
