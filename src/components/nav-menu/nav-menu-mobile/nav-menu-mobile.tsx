import { FC } from "react";
import classes from "./nav-menu-mobile.module.scss";
import { MenuItemMobile } from "./menu-item-mobile/menu-item-mobile";
import { List } from "ui/list/list";
import { menuList } from "components/nav-menu/consts";

export const NavMenuMobile: FC = () => {
  return (
    <nav className={classes["nav-menu"]}>
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
