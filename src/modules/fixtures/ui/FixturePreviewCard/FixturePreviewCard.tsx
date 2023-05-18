import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FixtureLeague } from "api/types/fixtures-types";
import classes from "./FixturePreviewCard.module.scss";

export interface FixturePreviewCardProps {
  fixtureId: number | string;
  leagueInfo: FixtureLeague;
  children: ReactNode;
}

export const FixturePreviewCard = ({
  fixtureId,
  leagueInfo,
  children,
}: FixturePreviewCardProps) => {
  const {
    name: leagueName,
    round: leagueRound,
    country: leagueCountry,
  } = leagueInfo;

  return (
    <article className={classes.fixture}>
      <h3 className={classes.fixtureTitle}>{leagueName}</h3>
      <p className={classes.fixtureSubtitle}>({leagueCountry})</p>
      <p className={classes.fixtureSubtitle}>{leagueRound}</p>
      <div>{children}</div>
      <Link className={classes.fixtureLink} to={`/fixtures/${fixtureId}`} />
    </article>
  );
};
