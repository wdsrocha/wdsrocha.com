import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
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
      <pre>{JSON.stringify(post, null, 2)}</pre>

      <div dangerouslySetInnerHTML={{ __html: post.content ?? "" }} />
    </article>
  );
};

export default Page;
