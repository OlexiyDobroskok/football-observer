import { FC, MouseEventHandler } from "react";
import { SvgIcon } from "ui/svg-icon/svg-icon";
import { Button } from "ui/button/button";
import searchIcon from "./search.svg";
import classes from "./search-button.module.scss";

interface SearchButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SearchButton: FC<SearchButtonProps> = ({ onClick }) => (
  <Button className={classes.button} onClick={onClick}>
    <SvgIcon className={classes.icon} href={`${searchIcon}#search`} />
  </Button>
);
