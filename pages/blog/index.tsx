import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Title } from "../../components/Title";
import { Post } from "../../lib/api";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  // Disabled while there are no blog posts
  // const posts = await getAllPosts(["title", "date", "slug", "content"]);
  const posts: Post[] = [];

  return {
    props: {
      posts,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  // Remove after adding the first blog post!!
  if (!posts.length) {
    return (
      <>
        <header>
          <Title>Blog posts</Title>
        </header>
        <div>
          Hey, stop peeping into the sitemap 😠! There is nothing to see here
          (for now 👀).
        </div>
      </>
    );
  }

  return (
    <>
      <header>
        <Title>Blog posts</Title>
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
