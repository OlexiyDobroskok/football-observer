import { SortedPlayerEvents } from "../../types/types";
import { SvgIcon } from "ui/SvgIcon/SvgIcon";
import { getEventTimeDescription } from "../../helpers/event-description";
import eventIcons from "./events.svg";
import classes from "./PlayerEventList.module.scss";

export interface PlayerEventListProps {
  events: SortedPlayerEvents;
}

export const PlayerEventList = ({
  events: { goals, yellowCards, redCards, substitutionOut, substitutionIn },
}: PlayerEventListProps) => {
  const playerGoals = goals.map(({ id }) => (
    <SvgIcon
      key={id}
      className={classes.eventIcon}
      href={`${eventIcons}#goal`}
    />
  ));
  const playerYellowCards = yellowCards.map(({ id }) => (
    <SvgIcon
      key={id}
      className={classes.eventIcon}
      href={`${eventIcons}#yellowCard`}
    />
  ));
  const playerRedCards = redCards.map(({ id }) => (
    <SvgIcon
      key={id}
      className={classes.eventIcon}
      href={`${eventIcons}#redCard`}
    />
  ));
  const playerSubstitutionOut = substitutionOut.map(({ player, time }) => (
    <div key={player.id} className={classes.substitution}>
      <SvgIcon
        className={classes.eventIcon}
        href={`${eventIcons}#substitutionOut`}
      />
      <span className={classes.eventTime}>{getEventTimeDescription(time)}</span>
    </div>
  ));
  const playerSubstitutionIn = substitutionIn.map(({ assist, time }) => (
    <div key={assist.id} className={classes.substitution}>
      <SvgIcon
        className={classes.eventIcon}
        href={`${eventIcons}#substitutionIn`}
      />
      <span className={classes.eventTime}>{getEventTimeDescription(time)}</span>
    </div>
  ));

  return (
    <div className={classes.events}>
      {!!playerSubstitutionOut.length && (
        <div className={classes.event}>{playerSubstitutionOut}</div>
      )}
      {!!playerSubstitutionIn.length && (
        <div className={classes.event}>{playerSubstitutionIn}</div>
      )}
      {!!playerYellowCards.length && (
        <div className={classes.event}>{playerYellowCards}</div>
      )}
      {!!playerRedCards.length && (
        <div className={classes.event}>{playerRedCards}</div>
      )}
      {!!playerGoals.length && (
        <div className={classes.event}>{playerGoals}</div>
      )}
    </div>
  );
};
