import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export interface Post {
  title?: string;
  date?: string;
  slug?: string;
  content?: string;
}

const postsDirectory = join(process.cwd(), "contents/blog");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export const getHomeDescription = () => {
  const fullPath = join(process.cwd(), `contents/home.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content } = matter(fileContents);
  console.log({ content });
  return content.split("\n")[0];
};

type ContentName = "home";

export const convertMarkdownToHtml = async (contentName: ContentName) => {
  const fullPath = join(process.cwd(), `contents/${contentName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content } = matter(fileContents);
  return await markdownToHtml(content);
};

export async function getPostBySlug(slug: string, fields: (keyof Post)[] = []) {
  const slugWithoutExtension = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${slugWithoutExtension}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: Post = {};

  fields.forEach(async (field) => {
    if (field === "slug") {
      post[field] = slugWithoutExtension;
    } else if (field === "content") {
      post[field] = await markdownToHtml(content ?? "");
    } else if (data[field]) {
      post[field] = data[field];
    }
  });

  return post;
}

export async function getAllPosts(fields: (keyof Post)[] = []) {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, fields))
  );
  return posts.sort((post1, post2) =>
    (post1?.date ?? "") > (post2?.date ?? "") ? -1 : 1
  );
}
