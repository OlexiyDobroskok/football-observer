import { Outlet } from "react-router-dom";
import { Container } from "ui/container/container";
import { NavMenuMobile } from "components/nav-menu";
import { LeaguesFilter } from "modules/leagues-filter";
import classes from "./root.module.scss";

export const Root = () => (
  <Container className={classes.container}>
    <header className={classes.header}>
      <NavMenuMobile />
      <LeaguesFilter />
    </header>
    <main className={classes.main}>
      <Outlet />
    </main>
  </Container>
);
