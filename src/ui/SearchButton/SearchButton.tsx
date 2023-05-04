import { MouseEventHandler } from "react";
import { SvgIcon } from "../SvgIcon/SvgIcon";
import searchIcon from "./search.svg";
import classes from "./SearchButton.module.scss";

interface SearchButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SearchButton = ({ onClick }: SearchButtonProps) => (
  <button className={classes.button} onClick={onClick}>
    <SvgIcon className={classes.icon} href={`${searchIcon}#search`} />
  </button>
);
