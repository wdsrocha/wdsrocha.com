import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatDate } from "../../lib/common";
import { BASE_URL } from "../../lib/constants";
import { Post, getPosts, pickPostFields } from "../../lib/posts";
import { generateRssFeed } from "../../lib/rss";
import { useRouter } from "next/router";
import { Tag } from "../../components/Tag";

export const getStaticProps: GetStaticProps<{
  allTags: string[];
  posts: Pick<Post, "title" | "name" | "date" | "tags">[];
}> = async () => {
  await generateRssFeed("blog");

  const posts = await getPosts();

  const allTags =
    posts
      .map((post) => post.tags ?? [])
      .filter((tags) => tags && tags.length > 0)
      .flat()
      .filter((tag, index, tags) => tags.indexOf(tag) === index) ?? [];

  return {
    props: {
      allTags,
      posts: posts.map((post) =>
        pickPostFields(post, ["title", "name", "date", "tags"])
      ),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  allTags,
  posts,
}) => {
  const canonicalUrl = `${BASE_URL}/blog`;
  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>(() => {
    let queryTags: string[] = [];

    if (Array.isArray(router.query.tags)) {
      queryTags = router.query.tags.join(",").split(",");
    }

    if (typeof router.query.tags === "string") {
      queryTags = router.query.tags.split(",");
    }

    return queryTags.filter((tag) => allTags.includes(tag));
  });

  const clearSelectedTags = () => {
    setSelectedTags([]);

    const query = router.query;
    delete query.tags;

    router.push(
      {
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  const onTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);
    router.push(
      {
        query: {
          tags:
            newSelectedTags.length > 0 ? newSelectedTags.join(",") : undefined,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedTags.length === 0) {
      return true;
    }

    return post.tags?.some((tag) => selectedTags.includes(tag));
  });

  return (
    <div className="flex flex-col gap-y-8">
      <NextSeo
        title="Blog"
        description="Personal posts about anything."
        canonical={canonicalUrl}
      />
      <header className="prose sm:prose-xl">
        <h1>Blog</h1>
        <p>
          Personal posts about anything.{" "}
          <Link href="/blog/feed.xml">
            <a className="text-pink-11 hover:no-underline">
              Subscribe to the RSS
            </a>
          </Link>
          .
        </p>
      </header>
      <div className="flex items-center gap-x-2">
        <ul className="flex items-center gap-x-2">
          <li>
            <Tag
              tag="All Tags"
              selected={selectedTags.length === 0}
              onClick={clearSelectedTags}
            />
          </li>
          {allTags.map((tag) => (
            <li key={tag}>
              <Tag
                tag={tag}
                selected={selectedTags.includes(tag)}
                onClick={() => onTagClick(tag)}
              />
            </li>
          ))}
        </ul>
      </div>
      <ol className="space-y-4">
        {filteredPosts.map((post) => (
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
              {post.tags.length > 0 && (
                <ul className="mt-1 flex items-center gap-x-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Tag
                        tag={tag}
                        selected={selectedTags.includes(tag)}
                        onClick={() => onTagClick(tag)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Page;
