import { ButtonHTMLAttributes, FC, MouseEventHandler } from "react";
import { SvgIcon } from "ui/svg-icon/svg-icon";
import { Button } from "ui/button/button";
import closeIcon from "./close-icon.svg";
import classes from "./close-button.module.scss";

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const CloseButton: FC<CloseButtonProps> = ({
  className,
  onClick,
  ...props
}) => (
  <Button
    className={[classes.button, className].join(" ")}
    {...props}
    onClick={onClick}
  >
    <SvgIcon className={classes.icon} href={`${closeIcon}#close`} />
  </Button>
);
