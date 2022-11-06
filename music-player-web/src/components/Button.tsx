import { DetailedHTMLProps, forwardRef, ButtonHTMLAttributes } from "react";

import { classNames } from "utils";

export const Button = forwardRef<
  HTMLButtonElement,
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <button ref={ref} className={classNames("button", className)} {...rest}>
      {children}
    </button>
  );
});
