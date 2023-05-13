import { ChangeEvent, useState } from "react";
import { useAppSelector } from "hooks/redux";
import { FixturesList, PreviewMatchesList } from "modules/fixtures";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { TabsList } from "ui/TabsList/TabsList";
import classes from "./Fixtures.module.scss";

const fixturesTabs = {
  resultsTab: "Results",
  scheduledTab: "Scheduled",
} as const;

type FixturesTabsKey = keyof typeof fixturesTabs;
type FixturesTab = (typeof fixturesTabs)[FixturesTabsKey];

export const Fixtures = () => {
  const { resultsTab, scheduledTab } = fixturesTabs;
  const [selectedTab, setSelectedTab] = useState<FixturesTab>(scheduledTab);
  const pageTabs: FixturesTab[] = [resultsTab, scheduledTab];

  const { isLive } = useAppSelector(({ fixtures }) => fixtures);

  const changeTab = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(target.value as FixturesTab);
  };

  const isResultTab = selectedTab === resultsTab;
  const isScheduledTab = selectedTab === scheduledTab;

  return (
    <>
      <HiddenElement as={"h1"}>League Fixtures</HiddenElement>
      <section className={classes["preview-place"]}>
        {isLive && (
          <>
            <h2 className={classes.title}>Live</h2>
            <PreviewMatchesList matchesType={"LIVE"} />
          </>
        )}
        {!isLive && isResultTab && (
          <>
            <h2 className={classes.title}>Upcoming Matches</h2>
            <PreviewMatchesList matchesType={"SCHEDULED"} />
          </>
        )}
        {!isLive && isScheduledTab && (
          <>
            <h2 className={classes.title}>Latest Matches</h2>
            <PreviewMatchesList matchesType={"FINISHED"} />
          </>
        )}
      </section>
      <div className={classes.tabs}>
        <TabsList
          tabs={pageTabs}
          checkedTab={selectedTab}
          groupName={"fixtures-tabs"}
          onChange={changeTab}
        />
      </div>
      <section className="matchesList">
        {isResultTab && (
          <>
            <HiddenElement as={"h2"}>Season Match Results</HiddenElement>
            <FixturesList fixturesType={"FINISHED"} />
          </>
        )}
        {isScheduledTab && (
          <>
            <HiddenElement as={"h2"}>
              Scheduled matches of the season
            </HiddenElement>
            <FixturesList fixturesType={"SCHEDULED"} />
          </>
        )}
      </section>
    </>
  );
};
