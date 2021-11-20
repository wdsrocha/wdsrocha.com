import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Post, getAllPosts } from "../../lib/api";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = await getAllPosts(["title", "date", "slug", "content"]);

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <header className="mt-10 mb-8">
        <h1 className="text-4xl font-extrabold">Blog posts</h1>
      </header>
      <ol>
        {posts.map((post) => (
          <li key={post.slug}>
            <article>
              <div className="block mt-4">
                <Link as={`/blog/${post.slug}`} href={"/blog/[slug]"}>
                  <a className="text-xl font-bold">{post.title}</a>
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

export default Home;
