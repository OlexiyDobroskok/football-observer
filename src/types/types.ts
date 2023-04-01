import { PAGE_ROUTES } from "helpers/consts";

export type Page = keyof typeof PAGE_ROUTES;
export type PagePath = (typeof PAGE_ROUTES)[Page];
