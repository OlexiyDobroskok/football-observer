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
  results: "Results",
  fixtures: "Fixtures",
} as const;

type FixturesTabsKey = keyof typeof fixturesTabs;
type FixturesTab = (typeof fixturesTabs)[FixturesTabsKey];

export const Fixtures = () => {
  const [selectedTab, setSelectedTab] = useState<FixturesTab>(
    fixturesTabs.fixtures
  );
  const {
    finishedMatches,
    scheduledMatches,
    liveMatches,
    timeToNextLiveMatch,
    isLive,
  } = useAppSelector(({ fixtures }) => fixtures);
  const { currentLeagueId, currentSeason } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
    );

    let timerId: number | null = null;

    if (!isLive && timeToNextLiveMatch) {
      timerId = window.setTimeout(() => {
        dispatch(
          fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
        );
      }, timeToNextLiveMatch);
    }

    if (isLive) {
      timerId = window.setInterval(
        () =>
          dispatch(
            fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
          ),
        30000
      );
    }

    return () => {
      if (timerId) window.clearTimeout(timerId);
    };
  }, [isLive, currentLeagueId, currentSeason]);

  const availableTabs: FixturesTab[] = [
    fixturesTabs.results,
    fixturesTabs.fixtures,
  ];

  const changeTab = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(target.value as FixturesTab);
  };

  let previewMatches: Fixture[];
  if (selectedTab === fixturesTabs.fixtures && liveMatches.length) {
    previewMatches = liveMatches;
  } else if (
    selectedTab === fixturesTabs.fixtures &&
    !liveMatches.length &&
    scheduledMatches.length
  ) {
    const [upcomingMatchDay] = scheduledMatches;
    previewMatches = upcomingMatchDay.fixtures;
  } else if (selectedTab === fixturesTabs.results && finishedMatches.length) {
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
      {selectedTab === fixturesTabs.results && (
        <FixturesList fixtures={finishedMatches} />
      )}
      {selectedTab === fixturesTabs.fixtures && (
        <FixturesList fixtures={scheduledMatches} />
      )}
    </>
  );
};
