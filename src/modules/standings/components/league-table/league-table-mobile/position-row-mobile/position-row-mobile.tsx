import { Link } from "react-router-dom";
import { FormList } from "modules/standings/components/form-list/form-list";
import { ClubIcon } from "ui/club-icon/club-icon";
import { TeamForm } from "modules/standings/types/types";
import classes from "./position-row-mobile.module.scss";

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

export const PositionRowMobile = ({
  id,
  rank,
  name,
  logo,
  gamesPlayed,
  goalsDiff,
  points,
  form,
  isEven,
}: PositionRowMobileProps) => (
  <tr className={isEven ? classes["bi-color"] : ""}>
    <td className={classes.data}>{rank}</td>
    <td>
      <div className={classes.team}>
        <ClubIcon icon={logo} />
        <Link className={classes.link} to={`/teams/${id}`}>
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
