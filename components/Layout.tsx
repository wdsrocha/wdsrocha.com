import Link from "next/link";
import React from "react";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto max-w-3xl flex flex-col h-screen">
      <header className="mt-8">
        <nav className="flex justify-between">
          <div>
            <Link href="/" passHref>
              <a>wdsrocha</a>
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/about/" passHref>
              <a>About</a>
            </Link>
            <Link href="/blog/" passHref>
              <a data-current={true}>Blog</a>
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-grow">{children}</main>
      <footer role="contentinfo" className="flex justify-center mb-8 gap-4">
        <a href="https://github.com/wdsrocha/">GitHub</a>
        <a href="https://linkedin.com/in/wdsrocha/">LinkedIn</a>
        <a href="https://twitter.com/wdsrocha/">Twitter</a>
      </footer>
    </div>
  );
};

// const HeaderLink = styled.a`
/* font-weight: 700;
  font-size: 1.5rem;
  color: hsl(0, 0%, 50%);

  & + a {
    margin-left: 16px;
  }

  &:hover {
    color: hsl(0, 0%, 0%);
    */
