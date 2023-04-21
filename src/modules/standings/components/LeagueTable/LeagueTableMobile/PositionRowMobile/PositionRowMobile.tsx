import { Link } from "react-router-dom";
import {
  FormList,
  FormListProps,
} from "modules/standings/components/FormList/FormList";
import { ClubLogo, ClubLogoProps } from "ui/ClubLogo/ClubLogo";
import classes from "./PositionRowMobile.module.scss";

interface PositionRowMobileProps extends FormListProps, ClubLogoProps {
  id: number;
  rank: number;
  name: string;
  gamesPlayed: number;
  goalsDiff: number;
  points: number;
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
  formList,
  isEven,
}: PositionRowMobileProps) => (
  <tr className={isEven ? classes["bi-color"] : ""}>
    <td className={classes.data}>{rank}</td>
    <td>
      <div className={classes.team}>
        <ClubLogo logo={logo} logoSize="SM" />
        <Link className={classes.link} to={`/teams/${id}`}>
          {name}
        </Link>
      </div>
    </td>
    <td className={classes.data}>{gamesPlayed}</td>
    <td className={classes.data}>{goalsDiff}</td>
    <td className={classes.data}>{points}</td>
    <td>
      <FormList formList={formList} formLimit={3} />
    </td>
  </tr>
);
