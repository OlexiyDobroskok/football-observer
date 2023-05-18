import { useAppSelector } from "hooks/redux";
import { SeasonsSelect } from "modules/leagues-filter";
import { LeagueTableMobile } from "modules/standings";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { Container } from "ui/Container/Container";
import classes from "./Standings.module.scss";

export const Standings = () => {
  const { currentLeagueInformation } = useAppSelector(({ leagues }) => leagues);

  const leagueName = currentLeagueInformation
    ? `${currentLeagueInformation.league.name} (${currentLeagueInformation.country.name})`
    : "";

  return (
    <>
      <HiddenElement as="h1">League Standings</HiddenElement>
      {currentLeagueInformation && (
        <section className="standings">
          <header className={classes.header}>
            <h2 className={classes.title}>{leagueName}</h2>
            <SeasonsSelect />
          </header>
          <LeagueTableMobile />
        </section>
      )}
      {!currentLeagueInformation && (
        <p className={classes.message}>League Information Not Found...</p>
      )}
    </>
  );
};
