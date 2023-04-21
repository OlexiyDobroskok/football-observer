import { FC } from "react";
import classes from "./NavMenuMobile.module.scss";
import { MenuItemMobile } from "components/NavMenu/NavMenuMobile/MenuItemMobile/MenuItemMobile";
import { List } from "ui/List/List";
import { menuList } from "components/NavMenu/consts";

export const NavMenuMobile: FC = () => {
  return (
    <nav className={classes["NavMenu"]}>
      <List
        className={classes.list}
        listItems={menuList}
        renderItem={({ id, path, iconHref }) => (
          <MenuItemMobile key={id} linkPath={path} iconHref={iconHref} />
        )}
      />
    </nav>
  );
};
