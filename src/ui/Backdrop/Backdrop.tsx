import { MouseEventHandler } from "react";
import classes from "./Backdrop.module.scss";

interface BackdropProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Backdrop = ({ onClick }: BackdropProps) => (
  <div className={classes.backdrop} onClick={onClick} />
);
