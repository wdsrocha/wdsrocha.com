import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { RiRssFill } from "react-icons/ri";
import { BASE_URL } from "../../lib/constants";
import { rssConfig, Rss } from "../../lib/rss";

export const getStaticProps: GetStaticProps<{
  feedConfig: Rss;
}> = async () => {
  return {
    props: {
      feedConfig: rssConfig("til"),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  feedConfig,
}) => {
  const canonicalUrl = `${BASE_URL}/feed`;
  return (
    <>
      <NextSeo
        title="RSS Feeds"
        description="Subscribe to different sections of this website."
        canonical={canonicalUrl}
      />
      <header className="prose mb-8 sm:prose-xl">
        <h1>RSS Feeds</h1>
        <p>
          Subscribe to different sections of this website.{" "}
          <a
            className="text-primary-11 underline-offset-4 hover:no-underline"
            href="https://aboutfeeds.com/"
          >
            Learn more about feeds
          </a>
          .
        </p>
      </header>
      <ol className="space-y-4">
        <li key="blog">
          <div className="flex items-center space-x-2 text-xl font-bold text-gray-11 sm:text-2xl">
            <h2>Wesley Rocha | Blog</h2>
            <RiRssFill />
          </div>
          <p className="text-sm text-gray-11 sm:text-base">
            Tech blog under construction
          </p>
        </li>
        <li key="til">
          <div className="flex items-center space-x-2 text-xl font-bold text-primary-11 sm:text-2xl">
            <Link href={"/til/feed.xml"}>
              <a className="underline-offset-4 hover:underline">
                <h2>{feedConfig.title}</h2>
              </a>
            </Link>
            <RiRssFill />
          </div>
          <p className="text-sm text-gray-700 sm:text-base">
            {feedConfig.description}
          </p>
        </li>
      </ol>
    </>
  );
};

export default Page;
