import { useAppSelector } from "hooks/redux";
import { SeasonsSelect } from "modules/leagues-filter";
import { LeagueTableMobile } from "modules/standings";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { Container } from "ui/Container/Container";
import classes from "./Standings.module.scss";

export const Standings = () => {
  const { currentLeagueInformation } = useAppSelector(({ leagues }) => leagues);

  const leagueName = currentLeagueInformation
    ? `${currentLeagueInformation.league.name} (${currentLeagueInformation.country.name}) `
    : "League Information Not Found...";

  return (
    <>
      <HiddenElement as="h1">League Standings</HiddenElement>
      {currentLeagueInformation && (
        <>
          <Container className={classes.container}>
            <h2 className={classes.title}>{leagueName}</h2>
            <SeasonsSelect />
          </Container>
          <LeagueTableMobile />
        </>
      )}
      {!currentLeagueInformation && (
        <p className={classes.title}>{leagueName}</p>
      )}
    </>
  );
};
