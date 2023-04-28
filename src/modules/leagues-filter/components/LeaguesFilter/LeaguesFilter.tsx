import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { openSearchModal } from "store/modals-slice";
import { Container } from "ui/Container/Container";
import { SearchButton } from "ui/SearchButton/SearchButton";
import { fetchLeagues } from "../../store/leagues-thunk";
import { SearchModal } from "../SearchModal/SearchModal";
import { TopLeaguesList } from "../TopLeaguesList/TopLeaguesList";
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
