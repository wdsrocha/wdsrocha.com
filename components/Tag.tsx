import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  tag: string;
  selected?: boolean;
}

export const Tag = (props: Props) => {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
        {
          "pointer-events-none": props.disabled,
          "bg-mauve-3 text-mauve-11 hover:bg-mauve-4 active:bg-mauve-5":
            !props.selected,
          "bg-pink-3 text-pink-11 hover:bg-pink-4 active:bg-pink-5":
            props.selected,
        }
      )}
    >
      {props.tag}
    </button>
  );
};
