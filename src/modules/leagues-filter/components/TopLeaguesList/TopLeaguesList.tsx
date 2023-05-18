import { useAppDispatch, useAppSelector } from "hooks/redux";
import { List } from "ui/List/List";
import { setCurrentLeague } from "../../store/leagues-slice";
import { LeagueFilterButton } from "../../ui/LeagueFilterButton/LeagueFilterButton";
import classes from "./TopLeaguesList.module.scss";

export const TopLeaguesList = () => {
  const { topLeaguesInfo, currentLeagueIsTop, currentLeagueInformation } =
    useAppSelector(({ leagues }) => leagues);
  const dispatch = useAppDispatch();

  if (topLeaguesInfo && currentLeagueInformation) {
    const {
      league: {
        id: currentLeagueId,
        name: currentLeagueName,
        logo: currentLeagueLogo,
      },
    } = currentLeagueInformation;

    const handleTopLeagueButtonClick = (id: number) => {
      dispatch(setCurrentLeague(id));
    };

    return (
      <div className={classes.container}>
        <div className={classes.leaguesList}>
          {!currentLeagueIsTop && (
            <LeagueFilterButton
              leagueName={currentLeagueName}
              logo={currentLeagueLogo}
              isCurrent={true}
              onClick={() => handleTopLeagueButtonClick(currentLeagueId)}
            />
          )}
          <List
            className={classes.topLeaguesList}
            listItems={topLeaguesInfo}
            renderItem={({ league: { id, name, logo } }) => (
              <LeagueFilterButton
                key={id}
                leagueName={name}
                logo={logo}
                isCurrent={id === currentLeagueId}
                onClick={() => handleTopLeagueButtonClick(id)}
              />
            )}
          />
        </div>
      </div>
    );
  }

  return <p className={classes.message}>Available Leagues Not Found...</p>;
};
