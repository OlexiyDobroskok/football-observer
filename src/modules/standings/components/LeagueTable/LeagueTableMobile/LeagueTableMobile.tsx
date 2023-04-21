import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { PositionRowMobile } from "modules/standings/components/LeagueTable/LeagueTableMobile/PositionRowMobile/PositionRowMobile";
import { isEven } from "modules/standings/helpers/helpers";
import { fetchLeagueStandings } from "modules/standings/store/standings-thunk";
import { tableHeaders } from "modules/standings/helpers/consts";
import classes from "./LeagueTableMobile.module.scss";
import { Loader } from "ui/Loader/Loader";

interface LeagueTableMobileProps {
  leagueId: number;
  season: number;
}

export const LeagueTableMobile = ({
  leagueId,
  season,
}: LeagueTableMobileProps) => {
  const { leagueData, isLoading } = useAppSelector(
    ({ standings }) => standings
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeagueStandings({ leagueId: leagueId, season: season }));
  }, [leagueId, season]);

  const positionsList = leagueData?.standings?.map(
    (
      {
        team: { id, logo, name },
        rank,
        all: { played },
        goalsDiff,
        points,
        form,
      },
      index
    ) => (
      <PositionRowMobile
        key={id}
        id={id}
        rank={rank}
        name={name}
        logo={logo}
        gamesPlayed={played}
        goalsDiff={goalsDiff}
        points={points}
        formList={form}
        isEven={isEven(index)}
      />
    )
  );

  const headingsList = tableHeaders.map(({ id, head }) => (
    <th key={id}>{head}</th>
  ));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <table className={classes.table}>
          <thead>
            <tr>{headingsList}</tr>
          </thead>
          <tbody>{positionsList}</tbody>
        </table>
      )}
    </>
  );
};
