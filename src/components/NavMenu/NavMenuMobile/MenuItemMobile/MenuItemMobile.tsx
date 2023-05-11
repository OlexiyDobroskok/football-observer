import { NavLink } from "react-router-dom";
import { PagePath } from "helpers/consts";
import { SvgIcon } from "ui/SvgIcon/SvgIcon";
import classes from "./MenuItemMobile.module.scss";

interface MenuItemProps {
  linkPath: PagePath;
  iconHref: string;
}

export const MenuItemMobile = ({ linkPath, iconHref }: MenuItemProps) => {
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
