import { ChangeEvent, useState } from "react";
import { useAppSelector } from "hooks/redux";
import {
  FinishedMatchesList,
  FinishedMatchesPreviewList,
  LiveMatchesPreviewList,
  ScheduledMatchesList,
  ScheduledMatchesPreviewList,
} from "modules/fixtures";
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

  const { isLiveMatches } = useAppSelector(({ fixtures }) => fixtures);

  const changeTab = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(target.value as FixturesTab);
  };

  const isResultTab = selectedTab === resultsTab;
  const isScheduledTab = selectedTab === scheduledTab;

  return (
    <>
      <HiddenElement as={"h1"}>League Fixtures</HiddenElement>
      <section className={classes.preview}>
        {isLiveMatches && (
          <>
            <h2 className={classes.previewTitle}>Live</h2>
            <LiveMatchesPreviewList />
          </>
        )}
        {!isLiveMatches && isResultTab && (
          <>
            <h2 className={classes.previewTitle}>Upcoming Matches</h2>
            <ScheduledMatchesPreviewList />
          </>
        )}
        {!isLiveMatches && isScheduledTab && (
          <>
            <h2 className={classes.previewTitle}>Latest Matches</h2>
            <FinishedMatchesPreviewList />
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
            <FinishedMatchesList />
          </>
        )}
        {isScheduledTab && (
          <>
            <HiddenElement as={"h2"}>
              Scheduled matches of the season
            </HiddenElement>
            <ScheduledMatchesList />
          </>
        )}
      </section>
    </>
  );
};
