import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Post, getAllPosts } from "../lib/api";

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
      <Head>
        <title>wdsrocha&apos;s homepage</title>
        <meta name="description" content="wdsrocha's homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      home
    </>
  );
};

export default Home;
