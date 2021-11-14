import Link from "next/link";
import React from "react";
import styles from "./Layout.module.css";

interface Props {
  children?: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <header>
        <nav>
          <ol>
            <li>
              <Link href="/">
                <a className={styles.teste}>wdsrocha</a>
              </Link>
            </li>
            <li>
              <Link href="/about/">About me</Link>
            </li>
            <li>
              <Link href="/blog/">Blog </Link>
            </li>
          </ol>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <ul>
          <li>
            <a href="https://github.com/wdsrocha/">GitHub</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/wdsrocha/">LinkedIn</a>
          </li>
          <li>
            <a href="https://twitter.com/wdsrocha/">Twitter</a>
          </li>
        </ul>
      </footer>
    </>
  );
};
