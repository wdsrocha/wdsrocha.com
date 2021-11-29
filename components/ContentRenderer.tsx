import styled from "styled-components";
import { colors } from "../lib/constants";

interface Props {
  children?: React.ReactNode;
}

export const ContentRenderer = ({ children }: Props) => (
  <Wrapper
    className="mt-8"
    dangerouslySetInnerHTML={{ __html: (children as string) ?? "" }}
  />
);

// TODO: Use Twin Macro when available for NextJS 12
// https://github.com/ben-rogerson/twin.macro/discussions/516
const Wrapper = styled.section`
  & h2,
  & h3,
  & h4,
  & p {
    // mt-4
    margin-top: 16px;
  }

  & h2 {
    // text-3xl
    font-size: 1.875rem;
    line-height: 2.25rem;

    // font-bold
    font-weight: 700;

    // mt-6
    margin-top: 24px;
  }

  & h3 {
    // text-2xl
    font-size: 1.5rem;
    line-height: 2rem;

    // font-bold
    font-weight: 700;
  }

  & h4 {
    // text-xl
    font-size: 1.25rem;
    line-height: 1.75rem;

    // font-bold
    font-weight: 700;
  }

  strong {
    font-weight: bold;
  }

  a {
    color: ${colors.link};
  }

  code {
    // font-mono
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
      "Liberation Mono", "Courier New", monospace;

    // bg-gray-100
    --tw-bg-opacity: 1;
    background-color: rgba(229, 231, 235, var(--tw-bg-opacity)); //

    padding: 1px;
    margin: -1px;
  }
`;
