import classes from "./league-table-mobile.module.scss";
import { FC } from "react";
import { useAppSelector } from "hooks/redux";
import { PositionRowMobile } from "modules/standings/components/league-table/league-table-mobile/position-row-mobile/position-row-mobile";
import { v4 as uuidv4 } from "uuid";
import { isEven } from "modules/standings/helpers/helpers";

interface ColumnHeading {
  id: string;
  head: string;
}

const tableHeaders: ColumnHeading[] = [
  {
    id: uuidv4(),
    head: "P",
  },
  {
    id: uuidv4(),
    head: "Team",
  },
  {
    id: uuidv4(),
    head: "GM",
  },
  {
    id: uuidv4(),
    head: "GD",
  },
  {
    id: uuidv4(),
    head: "Pts",
  },
  {
    id: uuidv4(),
    head: "Form",
  },
];

export const LeagueTableMobile: FC = () => {
  const leagueInformation = useAppSelector(
    ({ standings }) => standings.leagueData
  );

  const {
    name: leagueName,
    country,
    logo: leagueLogo,
  } = leagueInformation || {};

  const positionsList = leagueInformation?.standings?.map(
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
      <caption>
        <img src={leagueLogo} alt="" />
        <p>{`${leagueName} (${country})`}</p>
      </caption>
      <thead>
        <tr>{headingsList}</tr>
      </thead>
      <tbody>{positionsList}</tbody>
    </table>
  );
};
