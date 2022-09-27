import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Title } from "../../components/Title";
import { getAllPosts, Post } from "../../lib/api";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = await getAllPosts("til", ["title", "slug", "date"]);

  return {
    props: {
      posts,
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <header>
        <h1 className="text-4xl font-bold mb-2">TIL – Today I Learned</h1>
      </header>
      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <div className="block mt-4">
                <Link as={`/til/${post.slug}`} href={"/til/[slug]"}>
                  <a className="text-xl font-semibold">{post.title}</a>
                </Link>
              </div>
              <time className="text-sm text-gray-700" dateTime={post.date}>
                {post.date}
              </time>
            </article>
          </li>
        ))}
      </ol>
    </>
  );
};

export default Page;
