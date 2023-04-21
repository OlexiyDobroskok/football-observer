import { forwardRef, InputHTMLAttributes } from "react";
import classes from "./SearchInput.module.scss";

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
