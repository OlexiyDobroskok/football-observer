import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { Loader } from "ui/Loader/Loader";
import { checkIsEven } from "helpers/check-is-even";
import { tableHeaders } from "../../helpers/consts";
import { fetchLeagueStandings } from "../../store/standings-thunk";
import { PositionRowMobile } from "../../ui/PositionRowMobile/PositionRowMobile";
import classes from "./LeagueTableMobile.module.scss";

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
        isEven={checkIsEven(index)}
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
