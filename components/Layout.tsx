import Link from "next/link";
import React from "react";
import { colors } from "../lib/constants";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTelegramFill,
  RiTwitterFill,
  RiMailFill,
} from "react-icons/ri";

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col h-screen pt-4 px-5">
      <header className="text-3xl font-semibold">
        <Link href="/" passHref>
          <a
            style={{
              color: colors.highlightedText,
            }}
          >
            @wdsrocha
          </a>
        </Link>
      </header>
      <div className="flex-grow mb-8">
        <main className="mt-4 flex flex-col gap-4 bg-white p-8 sm:mx-0 -mx-5 shadow-lg">
          {children}
        </main>
      </div>
      <footer
        role="contentinfo"
        className="flex justify-center gap-4 text-3xl bg-white p-4 shadow-lg sm:mx-0 -mx-5"
      >
        <a href="https://github.com/wdsrocha/">
          <RiGithubFill color={colors.text} />
        </a>
        <a href="https://linkedin.com/in/wdsrocha/">
          <RiLinkedinBoxFill color={colors.text} />
        </a>
        <a href="https://twitter.com/wdsrocha/">
          <RiTwitterFill color={colors.text} />
        </a>
        <a href="https://t.me/wdsrocha/">
          <RiTelegramFill color={colors.text} />
        </a>
        <a href="mailto:hi@wdsrocha.com">
          <RiMailFill color={colors.text} />
        </a>
      </footer>
    </div>
  );
};
