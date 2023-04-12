import { forwardRef, InputHTMLAttributes } from "react";
import classes from "./search-input.module.scss";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={[classes.input, className].join(" ")}
      type="search"
      {...props}
      ref={ref}
    />
  )
);
