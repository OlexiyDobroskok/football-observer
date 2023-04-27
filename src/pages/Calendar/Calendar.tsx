import { useAppDispatch, useAppSelector } from "hooks/redux";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchFixtures,
  FixturesList,
  PreviewMatchesList,
} from "modules/fixtures";
import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { Tab } from "ui/Tab/Tab";
import { dayFixturesConverter } from "modules/fixtures/helpers/day-fixtures-converter";
import classes from "./Calendar.module.scss";

type CalendarTab = "Results" | "Fixtures";

export const Calendar = () => {
  const [selectedTab, setSelectedTab] = useState<CalendarTab>("Fixtures");
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

  const availableTabs: CalendarTab[] = ["Results", "Fixtures"];
  const changeTabs = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSelectedTab(target.value as CalendarTab);
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

  const resultsList = useMemo(
    () => dayFixturesConverter(finishedMatches),
    [finishedMatches]
  );
  const fixturesList = useMemo(
    () => dayFixturesConverter(scheduledMatches),
    [scheduledMatches]
  );

  console.log(fixturesList);
  return (
    <>
      <HiddenElement as={"h1"}>League Fixtures</HiddenElement>
      {!!liveMatches.length && (
        <div className={classes["live-place"]}>
          <PreviewMatchesList matches={liveMatches} />
        </div>
      )}
      <div className={classes["tabs-group"]}>{tabsList}</div>
      {selectedTab === "Results" && <FixturesList fixtures={resultsList} />}
      {selectedTab === "Fixtures" && <FixturesList fixtures={fixturesList} />}
    </>
  );
};
