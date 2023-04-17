import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { openSearchModal } from "store/modals-slice";
import { fetchLeagues } from "modules/leagues-filter/store/leagues-thunk";
import { SearchModal } from "modules/leagues-filter/components/search-modal/search-modal";
import { TopLeaguesList } from "modules/leagues-filter/components/top-leagues-list/top-leagues-list";
import { Container } from "ui/container/container";
import { SearchButton } from "ui/search-button/search-button";
import classes from "./leagues-filter.module.scss";

export const LeaguesFilter = () => {
  const { searchModalIsOpen } = useAppSelector(({ modals }) => modals);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeagues());
  }, []);

  const handleSearchButtonClick = () => {
    dispatch(openSearchModal());
  };

  return (
    <>
      {searchModalIsOpen && <SearchModal />}
      <Container className={classes.container}>
        <SearchButton onClick={handleSearchButtonClick} />
      </Container>
      <TopLeaguesList />
    </>
  );
};
