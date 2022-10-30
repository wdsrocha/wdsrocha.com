import { DefaultSeo, NextSeo } from "next-seo";
import { ComponentProps } from "react";
import { BASE_URL } from "./constants";

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
  openGraph: {
    images: [
      {
        url: `${BASE_URL}/apple-touch-icon.png`,
        width: 180,
        height: 180,
        alt: "Capital letter W written in cursive form along side a pink background.",
        type: "image/png",
      },
    ],
  },
};
