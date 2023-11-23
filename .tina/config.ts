import { defineConfig } from "tinacms";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

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
        label: "TIL Posts",
        name: "til",
        path: "contents/til",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              return (values?.title ?? "")?.toLowerCase().replace(/ /g, "-");
            },
          },
          defaultItem: () => ({
            date: new Date().toISOString(),
            published: false,
          }),
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
