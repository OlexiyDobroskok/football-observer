import { ChangeEvent, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { SearchInput } from "ui/SearchInput/SearchInput";
import { List } from "ui/List/List";
import {
  setCurrentLeague,
  setSearchLeaguesQuery,
} from "modules/leagues-filter/store/leagues-slice";
import { closeModal } from "store/modals-slice";
import classes from "./LeagueSearchPlace.module.scss";
import { Button } from "ui/Button/Button";

export const LeagueSearchPlace = () => {
  const { searchQuery, filteredLeagues } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleQueryChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchLeaguesQuery(target.value));
  };

  const handleLeagueButtonClick = (id: number) => {
    dispatch(setCurrentLeague(id));
    dispatch(setSearchLeaguesQuery(""));
    dispatch(closeModal());
  };

  return (
    <div className={classes.search}>
      <SearchInput
        ref={searchInputRef}
        id="search-league"
        placeholder="League, cup, country"
        value={searchQuery}
        onChange={handleQueryChange}
      />
      <List
        className={classes["result-list"]}
        listItems={filteredLeagues}
        renderItem={({
          league: { id, name: leagueName },
          country: { name: countryName },
        }) => (
          <Button
            key={id}
            onClick={() => handleLeagueButtonClick(id)}
          >{`${leagueName} (${countryName})`}</Button>
        )}
      />
    </div>
  );
};
