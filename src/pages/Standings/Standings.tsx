import { useMemo } from "react";
import { useAppSelector } from "hooks/redux";
import { SeasonsSelect } from "modules/leagues-filter";
import { LeagueTableMobile } from "modules/standings";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { Container } from "ui/Container/Container";
import classes from "./Standings.module.scss";

export const Standings = () => {
  const { currentLeagueId, currentSeason, availableLeagues } = useAppSelector(
    ({ leagues }) => leagues
  );

  const currentLeagueInformation = useMemo(
    () => availableLeagues?.find(({ league }) => league.id === currentLeagueId),
    [availableLeagues, currentLeagueId]
  );

  const leagueName = currentLeagueInformation
    ? `${currentLeagueInformation.league.name} (${currentLeagueInformation.country.name}) `
    : "League information not found!";

  return (
    <>
      <HiddenElement as="h1">League Standings</HiddenElement>
      <Container className={classes.container}>
        <h2 className={classes.title}>{leagueName}</h2>
        <SeasonsSelect />
      </Container>
      <LeagueTableMobile leagueId={currentLeagueId} season={currentSeason} />
    </>
  );
};
