import { Page, PagePath } from "types/types";
import { PAGE_ROUTES } from "helpers/consts";
import svgSprite from "components/NavMenu/nav-menu-sprite.svg";

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
    iconHref: `${svgSprite}#home`,
  },
  {
    id: "c2",
    title: "FIXTURES",
    path: PAGE_ROUTES.FIXTURES,
    iconHref: `${svgSprite}#calendar`,
  },
  {
    id: "s3",
    title: "STANDINGS",
    path: PAGE_ROUTES.STANDINGS,
    iconHref: `${svgSprite}#standings`,
  },
  {
    id: "p4",
    title: "PROFILE",
    path: PAGE_ROUTES.PROFILE,
    iconHref: `${svgSprite}#profile`,
  },
];
