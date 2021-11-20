import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import styled from "styled-components";
import { getAllPosts, getPostBySlug, Post } from "../../lib/api";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts(["slug"]);

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

  const post = await getPostBySlug(params?.slug, [
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
      <header className="mt-10">
        <h1 className="text-4xl font-extrabold">{post.title}</h1>
        <time className="text-gray-700" dateTime={post.date}>
          {post.date}
        </time>
      </header>
      <Content
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
      />
    </article>
  );
};

// TODO: Use Twin Macro when available for NextJS 12
// https://github.com/ben-rogerson/twin.macro/discussions/516
const Content = styled.section`
  & h2,
  & h3,
  & h4,
  & p {
    // mt-4
    margin-top: 16px;
  }

  & h2 {
    // text-3xl
    font-size: 1.875rem;
    line-height: 2.25rem;

    // font-bold
    font-weight: 700;

    // mt-6
    margin-top: 24px;
  }

  & h3 {
    // text-2xl
    font-size: 1.5rem;
    line-height: 2rem;

    // font-bold
    font-weight: 700;
  }

  & h4 {
    // text-xl
    font-size: 1.25rem;
    line-height: 1.75rem;

    // font-bold
    font-weight: 700;
  }

  code {
    // font-mono
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;

    // bg-gray-100
    --tw-bg-opacity: 1;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity)); //

    padding: 1px;
    margin: -1px;
  }
`;

export default Page;
