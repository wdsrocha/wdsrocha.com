import Link from "next/link";
import React from "react";
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
    <div className="mx-auto flex h-screen max-w-4xl flex-col px-4 pt-4">
      <header className="flex flex-wrap items-center justify-between">
        <div className="mr-8">
          <Link href="/" passHref>
            <a className="text-2xl font-semibold text-primary-11 underline-offset-4 hover:underline">
              @wdsrocha
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-x-2 text-2xl font-semibold text-primary-11 underline-offset-4 ">
          <Link href="/blog" passHref>
            <a className="hover:underline">Blog</a>
          </Link>
        </div>
      </header>
      <div className="mb-8 flex-grow">
        <main className="-mx-4 mt-4 flex flex-col gap-4 bg-white py-8 px-4 shadow-lg sm:mx-0 sm:p-8">
          {children}
        </main>
      </div>
      <footer
        role="contentinfo"
        className="-mx-5 flex justify-center gap-4 bg-white p-4 text-3xl text-primary-11 shadow-lg sm:mx-0"
      >
        <a
          className="hover:text-primary-12"
          href="https://github.com/wdsrocha/"
        >
          <RiGithubFill />
        </a>
        <a
          className="hover:text-primary-12"
          href="https://linkedin.com/in/wdsrocha/"
        >
          <RiLinkedinBoxFill />
        </a>
        <a
          className="hover:text-primary-12"
          href="https://twitter.com/wdsrocha/"
        >
          <RiTwitterFill />
        </a>
        <a className="hover:text-primary-12" href="https://t.me/wdsrocha/">
          <RiTelegramFill />
        </a>
        <a className="hover:text-primary-12" href="mailto:hi@wdsrocha.com">
          <RiMailFill />
        </a>
      </footer>
    </div>
  );
};
