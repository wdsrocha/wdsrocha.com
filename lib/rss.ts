import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { create } from "xmlbuilder2";
import { getPosts } from "./posts";
import fs from "fs";
import { BASE_URL } from "./constants";

dayjs.extend(localizedFormat);

/**
 * Types that describe a RSS channel.
 *
 * Some fields were omitted. A complete list can be seen in the link below.
 *
 * @see {@link https://www.rssboard.org/rss-specification}
 */
export interface Rss {
  /**
   * The name of the channel. It's how people refer to your service. If you have
   * an HTML website that contains the same information as your RSS file, the
   * title of your channel should be the same as the title of your website.
   *
   * @example
   * ```txt
   * GoUpstate.com News Headlines
   * ```
   */
  title: string;

  /**
   * The URL to the HTML website corresponding to the channel.
   *
   * @example
   * ```txt
   * http://www.goupstate.com/
   * ```
   */
  link: string;

  /**
   * Phrase or sentence describing the channel.
   *
   * @example
   * ```txt
   * The latest news from GoUpstate.com, a Spartanburg Herald-Journal Web site.
   * ```
   */
  description: string;

  /**
   * The URL to the feed corresponding to the channel.
   *
   * @see {@link https://validator.w3.org/feed/docs/warning/MissingAtomSelfLink.html}
   *
   * @example
   * ```txt
   * http://
   * ```
   */
  atomLink?: string;

  /**
   * The language the channel is written in. This allows aggregators to group
   * all Italian language sites, for example, on a single page.
   *
   * @see {@link https://www.rssboard.org/rss-language-codes Valid language codes}
   *
   * @example
   * ```txt
   * en-us
   * ```
   */
  language?: string;

  /**
   * Copyright notice for content in the channel.
   *
   * @example
   * ```txt
   * Copyright 2002, Spartanburg Herald-Journal
   * ```
   */
  copyright?: string;

  /**
   * Email address for person responsible for editorial content.
   *
   * @example
   * ```txt
   * geo@herald.com (George Matesky)
   * ```
   */
  managingEditor?: string;

  /**
   * Email address for person responsible for technical issues relating to
   * channel.
   *
   * @example
   * ```txt
   * betty@herald.com (Betty Guernsey)
   * ```
   */
  webMaster?: string;

  /**
   * Specifies a GIF, JPEG or PNG image that can be displayed with the channel.
   */
  image?: Image;

  /**
   * Collection of items.
   *
   * @see Item
   */
  items: Item[];
}

/**
 * Types that describe a RSS item. This would be equivalent of a "blog post
 * object"
 */
export interface Item {
  /**
   * The title of the item.
   *
   * @example
   * ```txt
   * Venice Film Festival Tries to Quit Sinking
   * ```
   */
  title: string;

  /**
   * The URL of the item.
   *
   * @example
   * ```txt
   * http://nytimes.com/2004/12/07FEST.html
   * ```
   */
  link: string;

  /**
   * The item synopsis.
   *
   * @example
   * ```txt
   * Some of the most heated chatter at the Venice Film Festival this week was
   * about the way that the arrival of the stars at the Palazzo del Cinema was
   * being staged.
   * ```
   */
  description?: string;

  /**
   * Email address of the author of the item.
   */
  author?: string;

  /**
   * Includes the item in one or more categories.
   */
  category?: string;

  /**
   * URL of a page for comments relating to the item.
   */
  comments?: string;

  /**
   * A string that uniquely identifies the item.
   */
  guid?: string;

  /**
   * Indicates when the item was published.
   *
   * This date-time must conform to the Date and Time Specification of RFC 822.
   *
   * @see {@link http://asg.web.cmu.edu/rfc/rfc822.html}
   *
   * @example
   * ```txt
   * Sat, 07 Sep 2002 00:00:01 GMT
   * ```
   */
  pubDate?: string;

  /**
   * The RSS channel that the item came from.
   */
  source?: string;

  /**
   * HTML encoded string containing the full item content.
   */
  content?: string;
}

/**
 * Specifies a GIF, JPEG or PNG image that can be displayed with the channel.
 */
export interface Image {
  /**
   * The URL of a GIF, JPEG or PNG image that represents the channel.
   */
  url: string;

  /**
   * Width of the image in pixels.
   *
   * Maximum value for width is 144, default value is 88.
   */
  width?: number;

  /**
   * Height of the image in pixels.
   *
   * Maximum value for height is 400, default value is 31.
   */
  height?: number;
}

function toXml(data: Rss): string {
  const rss = {
    rss: {
      "@version": "2.0",
      "@xmlns:atom": "http://www.w3.org/2005/Atom",
      "@xmlns:content": "http://purl.org/rss/1.0/modules/content/",
      channel: {
        title: data.title,
        link: data.link,
        description: data.description,
        language: data.language,
        copyright: data.copyright,
        managingEditor: data.managingEditor,
        webMaster: data.webMaster,
        "atom:link": data.atomLink
          ? {
              "@href": data.atomLink,
              "@rel": "self",
              "@type": "application/rss+xml",
            }
          : undefined,
        image: {
          url: data.image?.url,
          title: data.title,
          link: data.link,
          width: data.image?.width,
          height: data.image?.height,
        },
        item: data.items.map((item) => ({
          title: item.title,
          link: item.link,
          description: item.description,
          author: item.author,
          comments: item.comments,
          guid: item.guid,
          pubDate: item.pubDate,
          source: item.source,
          "content:encoded": item.content,
        })),
      },
    },
  };

  // Validate on https://validator.w3.org/feed/check.cgi from time to time
  return create(rss).end({ prettyPrint: true });
}

const RFC822_FORMAT_WITHOUT_TZ = "ddd, DD MMM YYYY HH:mm:ss";

export const defaultRssConfig: Rss = {
  title: "Wesley Rocha | TIL",
  link: `${BASE_URL}/til`,
  atomLink: `${BASE_URL}/til/rss.xml`,
  description: "Collection of brief documented learnings",
  language: "en",
  copyright: "Copyright 2022, Wesley Rocha",
  managingEditor: "hi@wdsrocha.com (Wesley Rocha)",
  webMaster: "hi@wdsrocha.com (Wesley Rocha)",
  image: {
    url: `${BASE_URL}/favicon-32x32.png`,
    width: 32,
    height: 32,
  },
  items: [],
};

export async function generateRssFeed(): Promise<void> {
  const posts = await getPosts();

  const data: Rss = {
    ...defaultRssConfig,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description ?? "",
      link: `${BASE_URL}/til/${post.name}`,
      guid: `${BASE_URL}/til/${post.name}`,
      pubDate: `${dayjs(post.date, "YYYY-MM-DD").format(
        RFC822_FORMAT_WITHOUT_TZ
      )} GMT`,
      content: post.content,
    })),
  };

  const xml = toXml(data);

  fs.writeFileSync("./public/til/feed.xml", xml);
}
