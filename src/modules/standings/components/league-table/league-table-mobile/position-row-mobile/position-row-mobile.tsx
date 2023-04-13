import classes from "./position-row-mobile.module.scss";
import { TeamForm } from "modules/standings/api/types";
import { FC } from "react";
import { ClubIcon } from "ui/club-icon/club-icon";
import { FormList } from "modules/standings/components/form-list/form-list";
import { Link } from "react-router-dom";

interface PositionRowMobileProps {
  id: number;
  rank: number;
  name: string;
  logo: string;
  gamesPlayed: number;
  goalsDiff: number;
  points: number;
  form: TeamForm[];
  isEven: boolean;
}

export const PositionRowMobile: FC<PositionRowMobileProps> = ({
  id,
  rank,
  name,
  logo,
  gamesPlayed,
  goalsDiff,
  points,
  form,
  isEven,
}) => {
  return (
    <tr className={isEven ? classes["bi-color"] : ""}>
      <td className={classes.data}>{rank}</td>
      <td>
        <div className={classes.team}>
          <ClubIcon icon={logo} />
          <Link className={classes.link} to={`/team/${id}`}>
            {name}
          </Link>
        </div>
      </td>
      <td className={classes.data}>{gamesPlayed}</td>
      <td className={classes.data}>{goalsDiff}</td>
      <td className={classes.data}>{points}</td>
      <td>
        <FormList formList={form} limit={3} />
      </td>
    </tr>
  );
};
