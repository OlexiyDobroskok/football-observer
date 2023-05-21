import { useFixtureDetail } from "../../hooks/use-fixture-detail";
import { GoalAssist } from "../../ui/GoalAssist/GoalAssist";
import { locationStatus } from "api/helpers/consts";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { genKeyAltEvent } from "../../helpers/gen-key-alt-event";
import classes from "./MatchGoalsAssist.module.scss";

export const MatchGoalsAssist = () => {
  const { fixtureEventsAlt, homeTeam, awayTeam } = useFixtureDetail();

  if (fixtureEventsAlt && homeTeam && awayTeam) {
    const {
      homeTeamEvents: { assists: homeTeamAssists },
      awayTeamEvents: { assists: awayTeamAssist },
    } = fixtureEventsAlt;

    const homeTeamAssistList = homeTeamAssists.map((player) => (
      <li key={genKeyAltEvent(player)}>
        <GoalAssist
          eventPlayer={player}
          teamLocationStatus={locationStatus.home}
        />
      </li>
    ));

    const awayTeamAssistList = awayTeamAssist.map((player) => (
      <li key={genKeyAltEvent(player)}>
        <GoalAssist
          eventPlayer={player}
          teamLocationStatus={locationStatus.away}
        />
      </li>
    ));

    return (
      <section className={classes.assists}>
        <HiddenElement as={"h3"}>Goals Assistants</HiddenElement>
        <section className="teamAssists">
          <HiddenElement
            as={"h4"}
          >{`${homeTeam.name} Goals Assistants`}</HiddenElement>
          <ul className={classes.assistsList}>{homeTeamAssistList}</ul>
        </section>
        <section className="teamAssists">
          <HiddenElement
            as={"h4"}
          >{`${awayTeam.name} Goals Assistants`}</HiddenElement>
          <ul className={classes.assistsList}>{awayTeamAssistList}</ul>
        </section>
      </section>
    );
  }

  return (
    <section>
      <HiddenElement as={"h3"}>Goals Assistants(No Assist)</HiddenElement>
    </section>
  );
};
