import classNames from "classnames";

interface Props {
  children?: React.ReactNode;
}

export const ContentRenderer = ({ children }: Props) => (
  <article
    className={classNames(
      "max-w-none",
      "prose prose-mauve sm:prose-xl",
      "prose-a hover:prose-a:no-underline prose-a:underline-offset-4 prose-a:text-primary-11",
      "prose-h1 prose-h1:break-words",
      "prose-h2 prose-h2:break-words",
      "prose-code prose-code:bg-primary-3 prose-code:text-primary-11 prose-code:px-1 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']"
    )}
    dangerouslySetInnerHTML={{ __html: (children as string) ?? "" }}
  />
);
