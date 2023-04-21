import { MouseEventHandler } from "react";
import { SvgIcon } from "src/ui/SvgIcon/SvgIcon";
import { Button } from "ui/Button/Button";
import searchIcon from "./search.svg";
import classes from "./SearchButton.module.scss";

interface SearchButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => (
  <Button className={classes.button} onClick={onClick}>
    <SvgIcon className={classes.icon} href={`${searchIcon}#search`} />
  </Button>
);
