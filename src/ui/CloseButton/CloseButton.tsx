import { MouseEventHandler } from "react";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import closeIcon from "./close-icon.svg";
import classes from "./CloseButton.module.scss";

interface CloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button className={classes.button} onClick={onClick}>
    <SvgIcon className={classes.icon} href={`${closeIcon}#close`} />
  </button>
);
