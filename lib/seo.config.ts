import { DefaultSeo, NextSeo } from "next-seo";
import { ComponentProps } from "react";

const faviconLinkTags: ComponentProps<typeof DefaultSeo>["additionalLinkTags"] =
  [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ];

export const defaultSeoConfig: ComponentProps<typeof NextSeo> = {
  defaultTitle: "Wesley Rocha (@wdsrocha)",
  titleTemplate: "%s | @wdsrocha",
  additionalLinkTags: [...faviconLinkTags],
};
