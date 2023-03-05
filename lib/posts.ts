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
  const fullPath = path.join(process.cwd(), "contents/home.md");
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
  const fullPath = path.join(process.cwd(), "contents/til/", filename);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const post = postScheme.parse(
    {
      ...data,
      name: path.parse(filename).name,
      content: await markdownToHtml(content),
    },
    { errorMap: getContextualErrorMap(filename) }
  );

  return post;
}

// Returns only the published ones!
export async function getPosts(): Promise<Post[]> {
  const promises = fs
    .readdirSync(path.join(process.cwd(), "contents/til"))
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => getPostByFilename(filename));

  const posts = await Promise.all(promises);

  return posts
    .filter((post) => post.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
