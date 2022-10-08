import classNames from "classnames";
import styled from "styled-components";
import { colors } from "../lib/constants";

interface Props {
  size?: "sm" | "base" | "lg" | "xl";
  children?: React.ReactNode;
}

export const ContentRenderer = ({ children, size = "base" }: Props) => (
  <Wrapper
    className={classNames("prose prose-a:no-underline", `prose-${size}`)}
    dangerouslySetInnerHTML={{ __html: (children as string) ?? "" }}
  />
);

// TODO: Use Twin Macro when available for NextJS 12
// https://github.com/ben-rogerson/twin.macro/discussions/516
const Wrapper = styled.section`
  a {
    color: ${colors.link};
    --bg-h: 2px;
    background: linear-gradient(0deg, ${colors.link}, ${colors.link}) no-repeat
      right bottom / 0 var(--bg-h);
    transition: background-size 350ms;
    padding-bottom: 2px;

    :where(:hover, :focus-visible) {
      background-size: 100% var(--bg-h);
      background-position-x: left;
    }
  }
`;
