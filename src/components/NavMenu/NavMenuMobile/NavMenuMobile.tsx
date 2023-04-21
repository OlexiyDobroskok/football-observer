import { MenuItemMobile } from "components/NavMenu/NavMenuMobile/MenuItemMobile/MenuItemMobile";
import { List } from "ui/List/List";
import { menuList } from "components/NavMenu/consts";
import classes from "./NavMenuMobile.module.scss";

export const NavMenuMobile = () => {
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
