import Link from "next/link";
import React from "react";
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiTelegramFill,
  RiTwitterFill,
  RiMailFill,
  RiRssFill,
} from "react-icons/ri";

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-4xl flex flex-col h-screen pt-4 px-4">
      <header className="flex flex-wrap justify-between items-center">
        <div className="mr-8">
          <Link href="/" passHref>
            <a className="text-2xl font-semibold text-primary-11 hover:underline underline-offset-4">
              @wdsrocha
            </a>
          </Link>
        </div>
        <div className="flex items-center gap-x-2 text-2xl font-semibold text-primary-11 underline-offset-4 ">
          <Link href="/blog" passHref>
            <a className="hover:underline">Blog</a>
          </Link>
          <span aria-hidden={true}>•</span>
          <Link href="/til" passHref>
            <a className="hover:underline">TIL</a>
          </Link>
        </div>
      </header>
      <div className="flex-grow mb-8">
        <main className="mt-4 flex flex-col gap-4 bg-white py-8 px-4 sm:p-8 sm:mx-0 -mx-4 shadow-lg">
          {children}
        </main>
      </div>
      <footer
        role="contentinfo"
        className="flex justify-center gap-4 text-3xl bg-white text-primary-11 p-4 shadow-lg sm:mx-0 -mx-5"
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
        <Link href="/feed">
          <a className="hover:text-primary-12">
            <RiRssFill />
          </a>
        </Link>
      </footer>
    </div>
  );
};
