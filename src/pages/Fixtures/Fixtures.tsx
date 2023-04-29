import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useLocation } from "react-router-dom";
import {
  fetchFixtures,
  FixturesList,
  PreviewMatchesList,
} from "modules/fixtures";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { Tab } from "ui/Tab/Tab";
import classes from "./Fixtures.module.scss";
import { Fixture } from "src/api/types/fixtures-types";

type FixturesTab = "Results" | "Fixtures";

export const Fixtures = () => {
  const [selectedTab, setSelectedTab] = useState<FixturesTab>("Fixtures");
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
  const location = useLocation();

  useEffect(() => {
    dispatch(
      fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
    );

    let timerId: number | null;

    if (!isLive && timeToNextLiveMatch) {
      timerId = window.setTimeout(() => {
        dispatch(
          fetchFixtures({ leagueId: currentLeagueId, season: currentSeason })
        );
      }, timeToNextLiveMatch);
    }

    if (isLive) {
      timerId = window.setTimeout(
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
  }, [isLive, currentLeagueId, currentSeason, location.pathname]);

  const availableTabs: FixturesTab[] = ["Results", "Fixtures"];

  const changeTabs = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(target.value as FixturesTab);
  };

  const tabsList = availableTabs.map((tabName) => (
    <Tab
      key={tabName}
      tabName={tabName}
      groupName={"calendar"}
      isChecked={selectedTab === tabName}
      onChange={changeTabs}
    />
  ));

  let previewMatches: Fixture[];
  if (selectedTab === "Fixtures" && liveMatches.length) {
    previewMatches = liveMatches;
  } else if (
    selectedTab === "Fixtures" &&
    !liveMatches.length &&
    scheduledMatches.length
  ) {
    const [upcomingMatchDay] = scheduledMatches;
    previewMatches = upcomingMatchDay.fixtures;
  } else if (selectedTab === "Results" && finishedMatches.length) {
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
      <div className={classes["tabs-group"]}>{tabsList}</div>
      {selectedTab === "Results" && <FixturesList fixtures={finishedMatches} />}
      {selectedTab === "Fixtures" && (
        <FixturesList fixtures={scheduledMatches} />
      )}
    </>
  );
};
