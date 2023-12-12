import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
}

export const ContentRenderer = ({ children }: Props) => (
  <article
    className={classNames(
      "max-w-none break-words",
      "prose prose-mauve sm:prose-xl",
      "prose-a prose-a:text-primary-11 prose-a:underline-offset-4 hover:prose-a:no-underline",
      "prose-h1",
      "prose-h2",
      "prose-code prose-code:rounded prose-code:bg-primary-3 prose-code:px-1 prose-code:text-primary-11 prose-code:before:content-[''] prose-code:after:content-['']"
    )}
    dangerouslySetInnerHTML={{ __html: (children as string) ?? "" }}
  />
);
