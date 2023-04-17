import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { LeagueButton } from "modules/leagues-filter/ui/league-button/league-button";
import { topLeaguesIdList } from "modules/leagues-filter/helpers/consts";
import { setCurrentLeague } from "modules/leagues-filter/store/leagues-slice";
import { List } from "ui/list/list";
import { LeagueInformation } from "api/types/leagues-types";
import classes from "./top-leagues-list.module.scss";

export const TopLeaguesList = () => {
  const { availableLeagues, currentLeagueId } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();

  const topLeagueId = useMemo(
    () => topLeaguesIdList.find((id) => id === currentLeagueId),
    [currentLeagueId]
  );

  const idList = topLeagueId
    ? topLeaguesIdList
    : [currentLeagueId, ...topLeaguesIdList];

  const topLeaguesList = useMemo(
    () =>
      idList
        .map((id) => availableLeagues?.filter(({ league }) => league.id === id))
        .flat()
        .filter(
          (leagueInfo) => leagueInfo !== undefined
        ) as LeagueInformation[],
    [availableLeagues, idList]
  );

  const handleTopLeagueButtonClick = (id: number) => {
    dispatch(setCurrentLeague(id));
  };

  return (
    <div className={classes["list-wrap"]}>
      <List
        className={classes.list}
        listItems={topLeaguesList}
        renderItem={({ league: { id, name, logo } }) => (
          <LeagueButton
            key={id}
            leagueName={name}
            logo={logo}
            isCurrent={id === currentLeagueId}
            onClick={() => handleTopLeagueButtonClick(id)}
          />
        )}
      />
    </div>
  );
};
