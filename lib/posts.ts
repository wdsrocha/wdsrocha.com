import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { remark } from "remark";
import { z } from "zod";
import html from "remark-html";
import prism from "remark-prism";

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism, { plugins: ["line-numbers"] })
    .process(markdown);
  return result.toString();
}

const Home = z
  .object({
    description: z.string(),
    content: z.string(),
  })
  .strict();

export type Home = z.infer<typeof Home>;

export async function getHome() {
  const fullPath = path.join(process.cwd(), "contents/home/home.md");
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const home = Home.parse({
    ...data,
    content: await markdownToHtml(content),
  });

  return home;
}

function getContextualErrorMap(filename: string): z.ZodErrorMap {
  return (_issue, ctx) => {
    const value =
      typeof ctx.data === "string" || typeof ctx.data === "number"
        ? ctx.data
        : "";
    return {
      message: `Received '${value}' for post '${filename}'`,
    };
  };
}

const postScheme = z
  .object({
    name: z.string(), // filename without extension
    title: z.string(),
    date: z.string().datetime(),
    lastUpdate: z.string().datetime().optional(),
    description: z.string().optional(),
    content: z.string(),
    published: z.boolean(),
    tags: z.array(z.string()),
  })
  .strict();

export type Post = z.infer<typeof postScheme>;

export function pickPostFields<Field extends keyof Post>(
  post: Post,
  fields: Field[]
): Pick<Post, Field> {
  return fields.reduce<Pick<Post, Field>>(
    (partialPost, field) => ({ ...partialPost, [field]: post[field] }),
    {} as Pick<Post, Field>
  );
}

export async function getPostByFilename(filename: string): Promise<Post> {
  const fullPath = path.join(process.cwd(), "contents", "blog", filename);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const post = postScheme.parse(
    {
      ...data,
      tags: data.tags ?? [],
      name: path.parse(filename).name,
      content: await markdownToHtml(content),
    },
    { errorMap: getContextualErrorMap(filename) }
  );

  post.tags = post.tags.sort();

  return post;
}

// Returns only the published ones!
export async function getPosts(): Promise<Post[]> {
  const promises = fs
    .readdirSync(path.join(process.cwd(), "contents", "blog"))
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => getPostByFilename(filename));

  const posts = await Promise.all(promises);

  return posts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getPosts();
  const tags = posts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(tags));

  return uniqueTags.sort();
}
