import { ChangeEvent, useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { SearchInput } from "ui/SearchInput/SearchInput";
import { List } from "ui/List/List";
import { LeagueFilterButton } from "modules/leagues-filter/ui/LeagueFilterButton/LeagueFilterButton";
import {
  setCurrentLeague,
  setSearchQuery,
} from "modules/leagues-filter/store/leagues-slice";
import { closeModal } from "store/modals-slice";
import classes from "./SearchLeague.module.scss";

export const SearchLeague = () => {
  const { availableLeagues, searchQuery } = useAppSelector(
    ({ leagues }) => leagues
  );
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const foundLeagues = useMemo(() => {
    const minLength = 3;
    return availableLeagues && searchQuery.length >= minLength
      ? availableLeagues.filter(({ league, country }) =>
          `${league.name} ${country.name}`
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        )
      : [];
  }, [availableLeagues, searchQuery]);

  const handleQueryChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(target.value));
  };

  const handleLeagueButtonClick = (id: number) => {
    dispatch(setCurrentLeague(id));
    dispatch(setSearchQuery(""));
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
        listItems={foundLeagues}
        renderItem={({ league: { id, name, logo } }) => (
          <LeagueFilterButton
            key={id}
            logo={logo}
            leagueName={name}
            onClick={() => handleLeagueButtonClick(id)}
          />
        )}
      />
    </div>
  );
};
