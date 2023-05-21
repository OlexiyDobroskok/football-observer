import { Link } from "react-router-dom";
import { Scoreboard, ScoreboardProps } from "../../ui/Scoreboard/Scoreboard";
import { FixtureTeamsLocationStatus } from "api/types/fixtures-types";
import { ListTeamMark } from "../../ui/ListTeamMark/ListTeamMark";
import { locationStatus } from "api/helpers/consts";
import classes from "./FinishedMatchItem.module.scss";

export interface FinishedMatchItemProps
  extends Pick<ScoreboardProps, "matchScore"> {
  fixtureId: number;
  teamsOfMatch: FixtureTeamsLocationStatus;
  isEven?: boolean;
}

export const FinishedMatchItem = ({
  fixtureId,
  teamsOfMatch,
  matchScore,
  isEven,
}: FinishedMatchItemProps) => {
  const { home: homeTeam, away: awayTeam } = teamsOfMatch;
  const isScore = matchScore.home !== null && matchScore.away !== null;

  return (
    <div className={[classes.fixture, isEven && classes.lightBg].join(" ")}>
      <ListTeamMark team={homeTeam} teamStatus={locationStatus.home} />
      <div className={classes.fixtureScore}>
        {isScore && <Scoreboard matchScore={matchScore} />}
      </div>
      <ListTeamMark team={awayTeam} teamStatus={locationStatus.away} />
      <Link className={classes.fixtureLink} to={`/fixtures/${fixtureId}`} />
    </div>
  );
};
