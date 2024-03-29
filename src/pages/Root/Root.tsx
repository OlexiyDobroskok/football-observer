import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container } from "ui/Container/Container";
import { NavMenuMobile } from "components/NavMenu";
import { LeaguesFilter } from "modules/leagues-filter";
import classes from "./Root.module.scss";

export const Root = () => (
  <Container className={classes.container}>
    <header className={classes.header}>
      <NavMenuMobile />
      <LeaguesFilter />
    </header>
    <main className={classes.main}>
      <Outlet />
    </main>
    <ScrollRestoration />
  </Container>
);
