import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { formatDate } from "../../lib/common";
import { BASE_URL } from "../../lib/constants";
import { Post, getPosts, pickPostFields } from "../../lib/posts";
import { generateRssFeed } from "../../lib/rss";

export const getStaticProps: GetStaticProps<{
  posts: Pick<Post, "title" | "name" | "date">[];
}> = async () => {
  await generateRssFeed("blog");

  const blogPosts = await getPosts("blog");
  const tilPosts = await getPosts("til");
  const posts = [...blogPosts, ...tilPosts];

  return {
    props: {
      posts: posts.map((post) =>
        pickPostFields(post, ["title", "name", "date"])
      ),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  const canonicalUrl = `${BASE_URL}/blog`;
  return (
    <>
      <NextSeo
        title="Blog"
        description="Personal posts about anything."
        canonical={canonicalUrl}
      />
      <header className="prose mb-8 sm:prose-xl">
        <h1>Blog</h1>
        <p>Personal posts about anything.</p>
      </header>
      <ol className="space-y-4">
        {posts.map((post) => (
          <li key={post.name}>
            <article>
              <p>
                <time
                  className="text-sm text-gray-11 sm:text-base"
                  dateTime={post.date}
                >
                  {formatDate(post.date)}
                </time>
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                <Link as={`/blog/${post.name}`} href={"/blog/[name]"}>
                  <a className="text-primary-11 underline-offset-4 hover:underline">
                    {post.title}
                  </a>
                </Link>
              </h2>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Page;
