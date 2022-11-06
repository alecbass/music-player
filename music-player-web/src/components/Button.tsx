import { forwardRef, ComponentPropsWithoutRef } from "react";

import { classNames } from "utils";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"button">
>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <button ref={ref} className={classNames("button", className)} {...rest}>
      {children}
    </button>
  );
});
