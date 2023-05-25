import { TeamPlayerCard } from "../TeamPlayerCard/TeamPlayerCard";
import { List } from "ui/List/List";
import { TeamLogo } from "components/TeamLogo/TeamLogo";
import { SortedTeamSquad, TeamSquadApp } from "../../types/types";
import { checkIsEven } from "helpers/check-is-even";
import classes from "./TeamSquad.module.scss";

export interface TeamSquadProps {
  teamSquad: TeamSquadApp;
}

export const TeamSquad = ({ teamSquad: { team, players } }: TeamSquadProps) => {
  const { id: teamId, name: teamName, logo: teamLogo } = team;
  const playerPositions = Object.keys(players) as (keyof SortedTeamSquad)[];

  const positionsList = playerPositions.map((position) => (
    <section key={position} className={classes.position}>
      <h3 className={classes.positionTitle}>{position}</h3>
      <List
        className={classes.positionList}
        listItems={players[position]}
        renderItem={(player, index) => (
          <TeamPlayerCard
            key={player.id}
            player={player}
            isEven={checkIsEven(index)}
          />
        )}
      />
    </section>
  ));

  return (
    <article className={classes.team}>
      <header className={classes.teamHeader}>
        <h2 className={classes.teamTitle}>{teamName}</h2>
        <div className={classes.teamLogo}>
          <TeamLogo id={teamId} name={teamName} logo={teamLogo} />
        </div>
      </header>
      {positionsList}
    </article>
  );
};
