import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import { formatDate } from "../../lib/common";
import { BASE_URL } from "../../lib/constants";
import { Bookmark, getBookmarks } from "../../lib/bookmarks";

export const getStaticProps: GetStaticProps<{
  bookmarks: Pick<Bookmark, "name" | "title" | "url" | "date" | "description">[];
}> = async () => {
  const bookmarks = await getBookmarks();

  return {
    props: {
      bookmarks: bookmarks.map(({ name, title, url, date, description }) => ({
        name,
        title,
        url,
        date,
        ...(description !== undefined && { description }),
      })),
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  bookmarks,
}) => {
  const canonicalUrl = `${BASE_URL}/bookmarks`;

  return (
    <div className="flex flex-col gap-y-8">
      <NextSeo
        title="Bookmarks"
        description="Links to articles I read and found interesting"
        canonical={canonicalUrl}
      />
      <header className="prose sm:prose-xl">
        <h1>Bookmarks</h1>
        <p>Links to articles I read and found interesting.</p>
      </header>
      <ol className="space-y-4">
        {bookmarks.map((bookmark) => (
          <li key={bookmark.name}>
            <article>
              <p>
                <time
                  className="text-sm text-gray-11 sm:text-base"
                  dateTime={bookmark.date}
                >
                  {formatDate(bookmark.date)}
                </time>
              </p>
              <h2 className="text-xl font-bold sm:text-2xl">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-11 underline-offset-4 hover:underline"
                >
                  {bookmark.title}
                </a>
              </h2>
              {bookmark.description && (
                <p className="mt-1 text-gray-11">{bookmark.description}</p>
              )}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Page;
