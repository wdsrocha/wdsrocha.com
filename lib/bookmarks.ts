import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { z } from "zod";

function getContextualErrorMap(filename: string): z.ZodErrorMap {
  return (_issue, ctx) => {
    const value =
      typeof ctx.data === "string" || typeof ctx.data === "number"
        ? ctx.data
        : "";
    return {
      message: `Received '${value}' for bookmark '${filename}'`,
    };
  };
}

const bookmarkSchema = z
  .object({
    name: z.string(),
    title: z.string(),
    url: z.string().url(),
    date: z.string().datetime(),
    description: z.string().optional(),
    published: z.boolean(),
  })
  .strict();

export type Bookmark = z.infer<typeof bookmarkSchema>;

export async function getBookmarkByFilename(filename: string): Promise<Bookmark> {
  const fullPath = path.join(process.cwd(), "contents", "bookmarks", filename);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(file);
  const bookmark = bookmarkSchema.parse(
    {
      ...data,
      name: path.parse(filename).name,
    },
    { errorMap: getContextualErrorMap(filename) }
  );

  return bookmark;
}

// Returns only the published ones!
export async function getBookmarks(): Promise<Bookmark[]> {
  const bookmarksDir = path.join(process.cwd(), "contents", "bookmarks");

  if (!fs.existsSync(bookmarksDir)) {
    return [];
  }

  const promises = fs
    .readdirSync(bookmarksDir)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => getBookmarkByFilename(filename));

  const bookmarks = await Promise.all(promises);

  return bookmarks
    .filter((bookmark) => bookmark.published)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
