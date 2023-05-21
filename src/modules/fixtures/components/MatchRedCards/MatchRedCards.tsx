import { useFixtureDetail } from "../../hooks/use-fixture-detail";
import { genKeyAltEvent } from "../../helpers/gen-key-alt-event";
import { locationStatus } from "api/helpers/consts";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { RedCardEvent } from "../../ui/RedCardEvent/RedCardEvent";
import classes from "./MatchRedCards.module.scss";

export const MatchRedCards = () => {
  const { fixtureEventsAlt, homeTeam, awayTeam } = useFixtureDetail();

  if (fixtureEventsAlt && homeTeam && awayTeam) {
    const {
      homeTeamEvents: { redCards: homeTeamRedCads },
      awayTeamEvents: { redCards: awayTeamRedCards },
    } = fixtureEventsAlt;

    const homeTeamRedCardsList = homeTeamRedCads.map((player) => (
      <li key={genKeyAltEvent(player)}>
        <RedCardEvent
          eventPlayer={player}
          teamLocationStatus={locationStatus.home}
        />
      </li>
    ));

    const awayTeamRedCardsList = awayTeamRedCards.map((player) => (
      <li key={genKeyAltEvent(player)}>
        <RedCardEvent
          eventPlayer={player}
          teamLocationStatus={locationStatus.away}
        />
      </li>
    ));

    return (
      <section className={classes.redCards}>
        <HiddenElement as={"h3"}>Red Cards</HiddenElement>
        <section className="teamRedCards">
          <HiddenElement
            as={"h4"}
          >{`${homeTeam.name} Red Cards`}</HiddenElement>
          <ul className={classes.redCardsList}>{homeTeamRedCardsList}</ul>
        </section>
        <section className="teamRedCards">
          <HiddenElement
            as={"h4"}
          >{`${awayTeam.name} Red Cards`}</HiddenElement>
          <ul className={classes.redCardsList}>{awayTeamRedCardsList}</ul>
        </section>
      </section>
    );
  }

  return (
    <section className={classes.redCards}>
      <HiddenElement as={"h3"}>Red Cards(No Red Cards)</HiddenElement>
    </section>
  );
};
