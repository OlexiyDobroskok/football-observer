import classes from "./menu-item-mobile.module.scss";
import { NavLink } from "react-router-dom";
import { FC } from "react";
import { PagePath } from "types/types";
import { SvgIcon } from "ui/svg-icon/svg-icon";

interface MenuItemProps {
  linkPath: PagePath;
  iconHref: string;
}

export const MenuItemMobile: FC<MenuItemProps> = ({ linkPath, iconHref }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : "")}
        to={linkPath}
      >
        <SvgIcon className={classes.icon} href={iconHref} />
      </NavLink>
    </li>
  );
};
