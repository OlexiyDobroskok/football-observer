import { LineUpTeamSquad } from "../../types/types";
import { LineupTeam } from "api/types/fixtures-types";
import { List } from "ui/List/List";
import { checkIsEven } from "helpers/check-is-even";
import { LineUpPlayerCard } from "../../ui/LineUpPlayerCard/LineUpPlayerCard";
import { TeamLogo } from "components/TeamLogo/TeamLogo";
import classes from "./TeamLineUp.module.scss";

export interface TeamLineUpProps {
  team: LineupTeam;
  lineUpSquad: LineUpTeamSquad;
  formation: string | null;
}

export const TeamLineUp = ({
  team: { id: teamId, name: teamName, logo: teamLogo },
  lineUpSquad,
  formation,
}: TeamLineUpProps) => {
  const positions = Object.keys(lineUpSquad) as (keyof LineUpTeamSquad)[];

  const positionList = positions.map((position) => (
    <section key={position} className={classes.position}>
      <h3 className={classes.positionTitle}>{position}</h3>
      <List
        className={classes.positionList}
        listItems={lineUpSquad[position]}
        renderItem={(player, index) => {
          const isEvent = checkIsEven(index);
          return (
            <div key={player.id} className={isEvent ? classes.playerAlt : ""}>
              <LineUpPlayerCard player={player} />
            </div>
          );
        }}
      />
    </section>
  ));

  return (
    <article className={classes.team}>
      <header className={classes.teamHeader}>
        <h2 className={classes.teamTitle}>{teamName}</h2>
        <span className={classes.teamFormation}>
          {formation ? `( ${formation} )` : "(no formation information)"}
        </span>
        <div className={classes.teamLogo}>
          <TeamLogo id={teamId} name={teamName} logo={teamLogo} />
        </div>
      </header>
      <div className={classes.teamLineUp}>{positionList}</div>
    </article>
  );
};
