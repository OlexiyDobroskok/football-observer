import { useTeamInfo } from "../../hooks/use-team-info";
import { SvgIcon } from "ui/SvgIcon/SvgIcon";
import stadiumIcon from "./stadium.svg";
import classes from "./TeamCard.module.scss";
import { TeamLogo } from "components/TeamLogo/TeamLogo";
import { Link } from "react-router-dom";

export const TeamCard = () => {
  const { teamInformation } = useTeamInfo();

  if (teamInformation) {
    const { team, venue } = teamInformation;

    return (
      <article className={classes.team}>
        <header className={classes.teamHeader}>
          <div className={classes.teamLogo}>
            <TeamLogo id={team.id} name={team.name} logo={team.logo} />
          </div>
          <h2>{team.name}</h2>
          <p className={classes.teamStadium}>
            <SvgIcon
              className={classes.stadiumIcon}
              href={`${stadiumIcon}#stadium`}
            />
            <Link
              className={classes.stadiumLink}
              to={`/stadium/${venue.id}`}
            >{`${venue.name} Stadium`}</Link>
          </p>
        </header>
      </article>
    );
  }

  return <p>Team information Not Found...</p>;
};
