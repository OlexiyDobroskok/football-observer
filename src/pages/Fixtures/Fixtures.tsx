import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  fetchFixtures,
  FixturesList,
  PreviewMatchesList,
} from "modules/fixtures";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { Fixture } from "api/types/fixtures-types";
import { TabList } from "ui/TabList/TabList";
import classes from "./Fixtures.module.scss";

const fixturesTabs = {
  resultsTab: "Results",
  fixturesTab: "Fixtures",
} as const;

type FixturesTabsKey = keyof typeof fixturesTabs;
type FixturesTab = (typeof fixturesTabs)[FixturesTabsKey];

export const Fixtures = () => {
  const { resultsTab, fixturesTab } = fixturesTabs;
  const [selectedTab, setSelectedTab] = useState<FixturesTab>(fixturesTab);
  const { finishedMatches, scheduledMatches, liveMatches, timerId } =
    useAppSelector(({ fixtures }) => fixtures);
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (currentLeagueId && currentSeason)
      dispatch(
        fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
      );
  }, [currentLeagueId, currentSeason]);

  const availableTabs: FixturesTab[] = [resultsTab, fixturesTab];

  const changeTab = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(target.value as FixturesTab);
  };

  let previewMatches: Fixture[];
  if (selectedTab === fixturesTab && liveMatches.length) {
    previewMatches = liveMatches;
  } else if (
    selectedTab === fixturesTab &&
    !liveMatches.length &&
    scheduledMatches.length
  ) {
    const [upcomingMatchDay] = scheduledMatches;
    previewMatches = upcomingMatchDay.fixtures;
  } else if (selectedTab === resultsTab && finishedMatches.length) {
    const [latestMatchDay] = finishedMatches;
    previewMatches = latestMatchDay.fixtures;
  } else {
    previewMatches = [];
  }

  return (
    <>
      <HiddenElement as={"h1"}>League Fixtures</HiddenElement>
      <div className={classes["live-place"]}>
        <PreviewMatchesList matches={previewMatches} />
      </div>
      <div className={classes.tabs}>
        <TabList
          tabs={availableTabs}
          checkedTab={selectedTab}
          groupName={"fixtures-tabs"}
          onChange={changeTab}
        />
      </div>
      {selectedTab === resultsTab && (
        <FixturesList fixtures={finishedMatches} />
      )}
      {selectedTab === fixturesTab && (
        <FixturesList fixtures={scheduledMatches} />
      )}
    </>
  );
};
