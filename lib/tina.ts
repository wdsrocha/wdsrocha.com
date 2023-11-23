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

const SimplePage = z
  .object({
    description: z.string(),
    content: z.string(),
  })
  .strict();

export type SimplePage = z.infer<typeof SimplePage>;

export async function getSimplePage(
  filepath: string /* contents/{filepath} */
) {
  const fullPath = path.join(process.cwd(), "contents", filepath);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const simplePage = SimplePage.parse({
    ...data,
    content: await markdownToHtml(content),
  });

  return simplePage;
}
