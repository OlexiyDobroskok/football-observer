import classes from "./hidden-element.module.scss";
import { FC, PropsWithChildren } from "react";

interface HiddenElementProps extends PropsWithChildren {
  as?: keyof JSX.IntrinsicElements;
}

export const HiddenElement: FC<HiddenElementProps> = ({
  as: Component = "div",
  children,
}) => {
  return (
    <Component className={classes["visually-hidden"]}>{children}</Component>
  );
};
