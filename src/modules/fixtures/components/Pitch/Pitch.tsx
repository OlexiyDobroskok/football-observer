import { useAppSelector } from "hooks/redux";
import { FormationLines } from "../../ui/FormationLines/FormationLines";
import { locationStatus } from "api/helpers/consts";
import { TeamLogo } from "components/TeamLogo/TeamLogo";
import classes from "./Pitch.module.scss";

export const Pitch = () => {
  const { comparativeTeamsLineUps } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );

  if (comparativeTeamsLineUps) {
    const { homeTeamLineUps, awayTeamLineUps } = comparativeTeamsLineUps;
    const { positionLines: homeTeamPositionLines, team: homeTeam } =
      homeTeamLineUps;
    const { positionLines: awayTeamPositionLines, team: awayTeam } =
      awayTeamLineUps;

    return (
      <div className={classes.pitchContainer}>
        <div className={classes.teamLogo}>
          <TeamLogo
            id={homeTeam.id}
            name={homeTeam.name}
            logo={homeTeam.logo}
          />
        </div>
        <div className={classes.pitch}>
          <div className={classes.teamLineUp}>
            <FormationLines
              team={homeTeam}
              positionLines={homeTeamPositionLines}
            />
          </div>
          <div className={`${classes.teamLineUp} ${classes.awayTeam}`}>
            <FormationLines
              team={awayTeam}
              positionLines={awayTeamPositionLines}
              teamLocationStatus={locationStatus.away}
            />
          </div>
        </div>
        <div className={classes.teamLogo}>
          <TeamLogo
            id={awayTeam.id}
            name={awayTeam.name}
            logo={awayTeam.logo}
          />
        </div>
      </div>
    );
  }

  return (
    <p className={classes.message}>Sorry, Information is not available...</p>
  );
};
