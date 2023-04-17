import { MouseEventHandler } from "react";
import classes from "./backdrop.module.scss";

interface BackdropProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Backdrop = ({ onClick }: BackdropProps) => (
  <div className={classes.backdrop} onClick={onClick} />
);
