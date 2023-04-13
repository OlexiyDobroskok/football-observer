import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { PositionRowMobile } from "modules/standings/components/league-table/league-table-mobile/position-row-mobile/position-row-mobile";
import { isEven } from "modules/standings/helpers/helpers";
import { fetchLeagueStandings } from "modules/standings/store/standings-thunk";
import { tableHeaders } from "modules/standings/helpers/consts";
import classes from "./league-table-mobile.module.scss";

interface LeagueTableMobileProps {
  leagueId: number;
  season: number;
}

export const LeagueTableMobile: FC<LeagueTableMobileProps> = ({
  leagueId,
  season,
}) => {
  const standings = useAppSelector(
    ({ standings }) => standings.leagueData?.standings
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeagueStandings({ leagueId: leagueId, season: season }));
  }, [dispatch, fetchLeagueStandings, leagueId, season]);

  const positionsList = standings?.map(
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
        form={form}
        isEven={isEven(index)}
      />
    )
  );

  const headingsList = tableHeaders.map(({ id, head }) => (
    <th key={id}>{head}</th>
  ));

  return (
    <table className={classes.table}>
      <thead>
        <tr>{headingsList}</tr>
      </thead>
      <tbody>{positionsList}</tbody>
    </table>
  );
};
