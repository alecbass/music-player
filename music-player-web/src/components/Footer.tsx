import { ComponentPropsWithoutRef, forwardRef } from "react";

export const Footer = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<"footer">
>((props, ref) => {
  return (
    <footer ref={ref} {...props}>
      <h3>
        Like the project?{" "}
        <a target="_blank" href="https://github.com/alecbass/music-player">
          Find the repository here
        </a>
      </h3>
    </footer>
  );
});
