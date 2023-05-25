import { ChangeEvent, useLayoutEffect, useState } from "react";
import { useFixtureDetail } from "modules/fixtures/hooks/use-fixture-detail";
import {
  ComparativeTeamsLineUps,
  FixtureDetailCard,
  HeadToHeadMatchesList,
  HeadToHeadStats,
  MatchStatistic,
} from "modules/fixtures";
import { TabsList } from "ui/TabsList/TabsList";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { ComparativeTeamsSquad } from "modules/team";
import classes from "./FixtureDetail.module.scss";

const fixtureDetailTabs = {
  lineUps: "Line-ups",
  matchStats: "Statistics",
  h2h: "Head-to-Head",
  squads: "Squads",
} as const;

type FixtureDetailTab =
  (typeof fixtureDetailTabs)[keyof typeof fixtureDetailTabs];

export const FixtureDetail = () => {
  const { fixtureDetail, isScheduled } = useFixtureDetail();
  const { lineUps, squads, h2h, matchStats } = fixtureDetailTabs;
  const [tabs, setTabs] = useState<FixtureDetailTab[]>([]);
  const [selectedTab, setSelectedTab] = useState<
    FixtureDetailTab | undefined
  >();

  useLayoutEffect(() => {
    if (fixtureDetail) {
      const pageTabs: FixtureDetailTab[] = [
        !fixtureDetail.lineups.length ? squads : lineUps,
        h2h,
        matchStats,
      ];
      setTabs(pageTabs);
    }
  }, [fixtureDetail]);

  useLayoutEffect(() => {
    setSelectedTab(
      !isScheduled ? fixtureDetailTabs.matchStats : fixtureDetailTabs.h2h
    );
  }, [isScheduled]);

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
          <section className={[classes.h2h, classes.tabSection].join(" ")}>
            <HiddenElement as={"h2"}>Head to Head Tab</HiddenElement>
            <HeadToHeadStats />
            <HeadToHeadMatchesList numberRecentMatches={5} />
          </section>
        )}
        {selectedTab === fixtureDetailTabs.squads && (
          <section className={["squad", classes.tabSection].join(" ")}>
            <HiddenElement as={"h2"}>Teams Squads Tab</HiddenElement>
            <ComparativeTeamsSquad />
          </section>
        )}
        {selectedTab === fixtureDetailTabs.matchStats && (
          <section className={["statistic", classes.tabSection].join(" ")}>
            <HiddenElement as={"h2"}>Statistic Tab</HiddenElement>
            <MatchStatistic />
          </section>
        )}
        {selectedTab === fixtureDetailTabs.lineUps && (
          <section className={["line-ups", classes.tabSection].join(" ")}>
            <HiddenElement as={"h2"}>Line-Ups Tab</HiddenElement>
            <ComparativeTeamsLineUps />
          </section>
        )}
      </div>
    </>
  );
};
