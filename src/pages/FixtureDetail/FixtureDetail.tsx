import { ChangeEvent, useState } from "react";
import { useAppSelector } from "hooks/redux";
import {
  FixtureDetailCard,
  HeadToHeadMatchesList,
  HeadToHeadStats,
} from "modules/fixtures";
import { TabsList } from "ui/TabsList/TabsList";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { ComparativeTeamsSquad } from "modules/team";
import classes from "./FixtureDetail.module.scss";

const fixtureDetailTabs = {
  lineUps: "Line-ups",
  matchStats: "Match Stats",
  h2h: "Head-to-Head",
  squads: "Squads",
} as const;

type FixtureDetailTab =
  (typeof fixtureDetailTabs)[keyof typeof fixtureDetailTabs];

export const FixtureDetail = () => {
  const { isLive, isScheduled } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const [selectedTab, setSelectedTab] = useState<FixtureDetailTab>(
    isLive ? fixtureDetailTabs.matchStats : fixtureDetailTabs.h2h
  );
  const { lineUps, squads, h2h, matchStats } = fixtureDetailTabs;
  const tabs: FixtureDetailTab[] = [
    isScheduled ? squads : lineUps,
    h2h,
    matchStats,
  ];

  const changeTab = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSelectedTab(target.value as FixtureDetailTab);

  return (
    <>
      <HiddenElement as={"h1"}>Details of the Match</HiddenElement>
      <div className={classes.detailCard}>
        <FixtureDetailCard />
      </div>
      <div className={classes.tabs}>
        <TabsList
          tabs={tabs}
          checkedTab={selectedTab}
          groupName={"fixture-detail-tabs"}
          onChange={changeTab}
        />
      </div>
      <div>
        {selectedTab === fixtureDetailTabs.h2h && (
          <section className={classes.h2h}>
            <HiddenElement as={"h2"}>Head to Head Tab</HiddenElement>
            <HeadToHeadStats />
            <HeadToHeadMatchesList numberRecentMatches={5} />
          </section>
        )}
        {selectedTab === fixtureDetailTabs.squads && <ComparativeTeamsSquad />}
      </div>
    </>
  );
};
