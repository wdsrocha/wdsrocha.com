import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { ContentRenderer } from "../components/ContentRenderer";
import { getHome, getPosts, Home, pickPostFields, Post } from "../lib/posts";
import { formatDate } from "../lib/common";
import Link from "next/link";

export const getStaticProps: GetStaticProps<{
  home: Home;
  posts: Pick<Post, "title" | "name" | "date">[];
}> = async () => {
  const home = await getHome();
  const posts = (await getPosts()).slice(0, 5);

  return {
    props: {
      home,
      posts: posts.map((post) =>
        pickPostFields(post, ["title", "name", "date"])
      ),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  home,
  posts,
}) => {
  const { content, description } = home;
  const canonicalUrl = `https://www.wdsrocha.com`;
  return (
    <>
      <NextSeo description={description} canonical={canonicalUrl} />
      <ContentRenderer>{content}</ContentRenderer>
      <br />
      <section className="space-y-6">
        <header className="prose sm:prose-xl">
          <h2>Lastest blog posts</h2>
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
      </section>
    </>
  );
};

export default Page;
