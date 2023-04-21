import {
  ButtonHTMLAttributes,
  FC,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import classes from "./Button.module.scss";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const Button: FC<ButtonProps> = ({
  className,
  onClick,
  children,
  ...props
}) => (
  <button
    className={[classes.button, className].join(" ")}
    {...props}
    onClick={onClick}
  >
    {children}
  </button>
);
