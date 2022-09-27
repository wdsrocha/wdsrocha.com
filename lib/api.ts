import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export interface Post {
  title?: string;
  date?: string;
  slug?: string;
  content?: string;
}

type PostCategory = "blog" | "til";

function getPostsDirectory(category: PostCategory): string {
  return join(process.cwd(), `contents/${category}`);
}

export function getPostSlugs(category: PostCategory): string[] {
  return fs.readdirSync(getPostsDirectory(category));
}

export const getHomeDescription = () => {
  const fullPath = join(process.cwd(), `contents/home.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content } = matter(fileContents);
  return content.split("\n")[0];
};

type ContentName = "home";

export const convertMarkdownToHtml = async (contentName: ContentName) => {
  const fullPath = join(process.cwd(), `contents/${contentName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { content } = matter(fileContents);
  return await markdownToHtml(content);
};

export async function getPostBySlug(
  category: PostCategory,
  slug: string,
  fields: (keyof Post)[] = []
) {
  const slugWithoutExtension = slug.replace(/\.md$/, "");
  const fullPath = join(
    getPostsDirectory(category),
    `${slugWithoutExtension}.md`
  );
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

export async function getAllPosts(
  category: PostCategory,
  fields: (keyof Post)[] = []
) {
  const slugs = getPostSlugs(category);
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(category, slug, fields))
  );
  return posts.sort((post1, post2) =>
    (post1?.date ?? "") > (post2?.date ?? "") ? -1 : 1
  );
}
