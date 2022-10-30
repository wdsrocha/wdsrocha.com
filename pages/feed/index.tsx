import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React from "react";
import { RiRssFill } from "react-icons/ri";
import { BASE_URL } from "../../lib/constants";
import { defaultRssConfig, Rss } from "../../lib/rss";

export const getStaticProps: GetStaticProps<{
  feedConfig: Rss;
}> = async () => {
  return {
    props: {
      feedConfig: defaultRssConfig,
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
      <header className="prose sm:prose-xl mb-8">
        <h1>RSS Feeds</h1>
        <p>
          Subscribe to different sections of this website.{" "}
          <a
            className="text-primary-11 hover:no-underline underline-offset-4"
            href="https://aboutfeeds.com/"
          >
            Learn more about feeds
          </a>
          .
        </p>
      </header>
      <ol className="space-y-4">
        <li key="blog">
          <div className="flex items-center text-xl sm:text-2xl font-bold space-x-2 text-gray-11">
            <h2>Wesley Rocha | Blog</h2>
            <RiRssFill />
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            Tech blog under construction
          </p>
        </li>
        <li key="til">
          <div className="flex items-center text-xl sm:text-2xl font-bold space-x-2 text-primary-11">
            <Link href={"/til/feed.xml"}>
              <a className="hover:underline underline-offset-4">
                <h2>{feedConfig.title}</h2>
              </a>
            </Link>
            <RiRssFill />
          </div>
          <p className="text-sm sm:text-base text-gray-700">
            {feedConfig.description}
          </p>
        </li>
      </ol>
    </>
  );
};

export default Page;
