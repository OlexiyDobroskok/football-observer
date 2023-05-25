import { ChangeEvent, useLayoutEffect, useState } from "react";
import { useAppSelector } from "hooks/redux";
import { RadioButtonsGroup } from "ui/RadioButtonsGroup/RadioButtonsGroup";
import { TeamLineUp } from "../TeamLineUp/TeamLineUp";
import { Pitch } from "../Pitch/Pitch";
import classes from "./ComparativeTeamsLineUps.module.scss";

export const ComparativeTeamsLineUps = () => {
  const { comparativeTeamsLineUps } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const [selectedTab, setSelectedTab] = useState<string | undefined>();

  useLayoutEffect(() => {
    if (comparativeTeamsLineUps) {
      const {
        homeTeamLineUps: { team },
      } = comparativeTeamsLineUps;
      setSelectedTab(team.name);
    }
  }, [comparativeTeamsLineUps]);

  if (comparativeTeamsLineUps) {
    const { homeTeamLineUps, awayTeamLineUps } = comparativeTeamsLineUps;
    const {
      squad: homeTeamSquad,
      team: homeTeam,
      formation: homeTeamFormation,
    } = homeTeamLineUps;
    const {
      squad: awayTeamSquad,
      team: awayTeam,
      formation: awayTeamFormation,
    } = awayTeamLineUps;

    const tabNames = [homeTeam.name, "Pitch", awayTeam.name];

    const changeTab = ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSelectedTab(target.value);
    };

    return (
      <div className={classes.compLineUps}>
        <div className={classes.tabsGroup}>
          <RadioButtonsGroup
            groupName={"line-ups"}
            buttonNames={tabNames}
            selectedButton={selectedTab}
            onChange={changeTab}
          />
        </div>
        {selectedTab === homeTeam.name && (
          <TeamLineUp
            team={homeTeam}
            lineUpSquad={homeTeamSquad}
            formation={homeTeamFormation}
          />
        )}
        {selectedTab === "Pitch" && <Pitch />}
        {selectedTab === awayTeam.name && (
          <TeamLineUp
            team={awayTeam}
            lineUpSquad={awayTeamSquad}
            formation={awayTeamFormation}
          />
        )}
      </div>
    );
  }

  return (
    <p className={classes.message}>Sorry, No Team Line-ups information...</p>
  );
};
