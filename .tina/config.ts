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
        label: "TIL Posts",
        name: "til",
        path: "contents/til",
        ui: {
          router: ({ document }) => {
            return `/til/${document._sys.filename}`;
          },
          filename: {
            slugify: (values) => {
              return (values?.title ?? "")?.toLowerCase().replace(/ /g, "-");
            },
          },
          defaultItem: () => ({
            date: new Date().toISOString(),
          }),
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
            isTitle: true,
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
            type: "datetime",
            required: true,
            name: "date",
            label: "Created at",
          },
          {
            type: "string",
            label: "Content",
            name: "body",
            isBody: true,
            ui: {
              component: "textarea",
            },
          },
        ],
      },
    ],
  },
});
