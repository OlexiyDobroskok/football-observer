import { ReactNode } from "react";
import classes from "./hidden-element.module.scss";

interface HiddenElementProps {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

export const HiddenElement = ({
  as: Component = "div",
  children,
}: HiddenElementProps) => (
  <Component className={classes["visually-hidden"]}>{children}</Component>
);
