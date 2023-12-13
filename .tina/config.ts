import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

function customSlugify(text: string | undefined) {
  return (text ?? "")
    .toString() // Cast to string (optional)
    .normalize("NFKD") // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
    .toLowerCase() // Convert the string to lowercase letters
    .trim() // Remove whitespace from both sides of a string (optional)
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\_/g, "-") // Replace _ with -
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/\-$/g, ""); // Remove trailing -
}

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        label: "Home",
        name: "home",
        path: "contents/home",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "rich-text",
            label: "Content",
            name: "content",
            isBody: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: "Brief description used in SEO and RSS",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
      {
        label: "Blog Posts",
        name: "blog",
        path: "contents/blog",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => customSlugify(values.title),
          },
          defaultItem: () => ({
            date: new Date().toISOString(),
            published: false,
          }),
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            description: "Should match content H1",
            required: true,
            isTitle: true,
          },
          {
            type: "datetime",
            required: true,
            name: "date",
            label: "Created at",
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: "Brief description used in SEO and RSS",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            label: "Tags",
            name: "tags",
            list: true,
            ui: {
              component: "tags",
            },
          },
          {
            type: "rich-text",
            label: "Content",
            name: "content",
            isBody: true,
          },
          {
            type: "boolean",
            name: "published",
            label: "Publish?",
          },
        ],
      },
      {
        label: "Freestyle App",
        name: "freestyle_app_privacy",
        path: "contents/freestyle-app",
        format: "md",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "rich-text",
            label: "Content",
            name: "content",
            isBody: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: "Brief description used in SEO and RSS",
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
