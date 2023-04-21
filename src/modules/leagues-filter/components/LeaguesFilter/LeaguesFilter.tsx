import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { openSearchModal } from "store/modals-slice";
import { fetchLeagues } from "modules/leagues-filter/store/leagues-thunk";
import { SearchModal } from "modules/leagues-filter/components/SearchModal/SearchModal";
import { TopLeaguesList } from "modules/leagues-filter/components/TopLeaguesList/TopLeaguesList";
import { Container } from "ui/Container/Container";
import { SearchButton } from "ui/SearchButton/SearchButton";
import classes from "./LeaguesFilter.module.scss";

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
