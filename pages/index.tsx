import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Post, getAllPosts } from "../lib/api";

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async () => {
  const posts = await getAllPosts(["title", "date", "slug", "content"]);

  return {
    props: {
      posts,
    },
  };
};

const Main = styled.main`
  display: inline-block;
  position: relative;
  color: white;

  &:after {
    content: "";
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 1;
    top: 110%;
    left: 0;
    backgroundcolor: white;
    transformorigin: bottom right;
    transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

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
