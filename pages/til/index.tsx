import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { BASE_URL } from "../../lib/constants";
import { Post, getPosts, pickPostFields } from "../../lib/posts";
import { generateRssFeed } from "../../lib/rss";

export const getStaticProps: GetStaticProps<{
  posts: Pick<Post, "title" | "slug" | "date">[];
}> = async () => {
  await generateRssFeed();

  const posts = await getPosts();

  return {
    props: {
      posts: posts.map((post) =>
        pickPostFields(post, ["title", "slug", "date"])
      ),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  const canonicalUrl = `${BASE_URL}/til`;
  return (
    <>
      <NextSeo
        title="TIL"
        description="Collection of brief documented learnings."
        canonical={canonicalUrl}
      />
      <header className="prose sm:prose-xl mb-8">
        <h1>TIL – Today I Learned</h1>
        <p>
          Collection of brief documented learnings.{" "}
          <Link href={"/til/feed.xml"}>
            <a className="text-primary-11 hover:no-underline underline-offset-4">
              Subscribe to RSS
            </a>
          </Link>
          .
        </p>
      </header>
      <ol className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <h2 className="text-xl sm:text-2xl font-bold">
                <Link as={`/til/${post.slug}`} href={"/til/[slug]"}>
                  <a className="text-primary-11 hover:underline underline-offset-4">
                    {post.title}
                  </a>
                </Link>
              </h2>
              <p>
                Published on{" "}
                <time
                  className="text-sm sm:text-base text-gray-700"
                  dateTime={post.date}
                >
                  {post.date}
                </time>
              </p>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Page;
