import { MouseEventHandler, ReactNode } from "react";
import classes from "./Button.module.scss";

export interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  isCurrent?: boolean;
}

export const Button = ({ onClick, children, isCurrent }: ButtonProps) => (
  <button
    className={[classes.button, isCurrent && classes.current].join(" ")}
    onClick={onClick}
  >
    {children}
  </button>
);
