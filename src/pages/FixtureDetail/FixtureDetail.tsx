import { ChangeEvent, useState } from "react";
import { useAppSelector } from "hooks/redux";
import {
  FixtureDetailCard,
  HeadToHeadMatchesList,
  HeadToHeadStats,
} from "modules/fixtures";
import { TabList } from "ui/TabList/TabList";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import classes from "./FixtureDetail.module.scss";

const fixtureDetailTabs = {
  lineUps: "Line-ups",
  matchStats: "Match Stats",
  h2h: "Head-to-Head",
  squads: "Squads",
} as const;

type DetailTabsKey = keyof typeof fixtureDetailTabs;
type FixtureDetailTab = (typeof fixtureDetailTabs)[DetailTabsKey];

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
      <div className={classes["detail-card"]}>
        <FixtureDetailCard />
      </div>
      <div className={classes.tabs}>
        <TabList
          tabs={tabs}
          checkedTab={selectedTab}
          groupName={"fixture-detail-tabs"}
          onChange={changeTab}
        />
      </div>
      <div>
        {selectedTab === fixtureDetailTabs.h2h && (
          <article className={classes.h2h}>
            <HiddenElement as={"h2"}>Head to Head Tab</HiddenElement>
            <HeadToHeadStats />
            <HeadToHeadMatchesList numberRecentMatches={5} />
          </article>
        )}
      </div>
    </>
  );
};
