import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { SvgIcon } from "src/ui/SvgIcon/SvgIcon";
import { Button } from "ui/Button/Button";
import closeIcon from "./close-icon.svg";
import classes from "./CloseButton.module.scss";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const CloseButton = ({
  className,
  onClick,
  ...props
}: CloseButtonProps) => (
  <Button
    className={[classes.button, className].join(" ")}
    {...props}
    onClick={onClick}
  >
    <SvgIcon className={classes.icon} href={`${closeIcon}#close`} />
  </Button>
);
