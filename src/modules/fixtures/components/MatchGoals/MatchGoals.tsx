import { useFixtureDetail } from "../../hooks/use-fixture-detail";
import { GoalEvent } from "../../ui/GoalEvent/GoalEvent";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { locationStatus } from "api/helpers/consts";
import { genKeyAltEvent } from "../../helpers/gen-key-alt-event";
import classes from "./MatchGoals.module.scss";

export const MatchGoals = () => {
  const { fixtureEventsAlt, homeTeam, awayTeam } = useFixtureDetail();

  if (fixtureEventsAlt && homeTeam && awayTeam) {
    const {
      homeTeamEvents: { goals: homeTeamGoals },
      awayTeamEvents: { goals: awayTeamGoals },
    } = fixtureEventsAlt;

    const homeTeamGoalsList = homeTeamGoals.map((player) => (
      <li key={genKeyAltEvent(player)}>
        <GoalEvent
          eventPlayer={player}
          teamLocationStatus={locationStatus.home}
        />
      </li>
    ));

    const awayTeamGoalsList = awayTeamGoals.map((player) => (
      <li key={genKeyAltEvent(player)}>
        <GoalEvent
          eventPlayer={player}
          teamLocationStatus={locationStatus.away}
        />
      </li>
    ));

    return (
      <section className={classes.goals}>
        <HiddenElement as={"h3"}>Match Goals</HiddenElement>
        <section className="teamGoals">
          <HiddenElement as={"h4"}>{`${homeTeam.name} Goals`}</HiddenElement>
          <ul className={classes.goalsList}>{homeTeamGoalsList}</ul>
        </section>
        <section className="teamGoals">
          <HiddenElement as={"h4"}>{`${awayTeam.name} Goals`}</HiddenElement>
          <ul className={classes.goalsList}>{awayTeamGoalsList}</ul>
        </section>
      </section>
    );
  }

  return (
    <section className={classes.goals}>
      <HiddenElement as={"h3"}>Match Goals(No Goals)</HiddenElement>
    </section>
  );
};
