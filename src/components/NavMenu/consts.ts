import { Page, PAGE_ROUTES, PagePath } from "helpers/consts";
import navMenuIcons from "./nav-menu-sprite.svg";

export interface MenuElement {
  id: string;
  title: Page;
  path: PagePath;
  iconHref: string;
}

export const menuList: MenuElement[] = [
  {
    id: "h1",
    title: "HOME",
    path: PAGE_ROUTES.HOME,
    iconHref: `${navMenuIcons}#home`,
  },
  {
    id: "c2",
    title: "FIXTURES",
    path: PAGE_ROUTES.FIXTURES,
    iconHref: `${navMenuIcons}#calendar`,
  },
  {
    id: "s3",
    title: "STANDINGS",
    path: PAGE_ROUTES.STANDINGS,
    iconHref: `${navMenuIcons}#standings`,
  },
  {
    id: "p4",
    title: "PROFILE",
    path: PAGE_ROUTES.PROFILE,
    iconHref: `${navMenuIcons}#profile`,
  },
];
