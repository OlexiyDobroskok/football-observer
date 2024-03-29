import { Button, ButtonProps } from "ui/Button/Button";
import classes from "./LeagueFilterButton.module.scss";

interface LeagueFilterButtonProps extends ButtonProps {
  leagueName: string;
  logo: string;
}

export const LeagueFilterButton = ({
  leagueName,
  logo,
  onClick,
  isCurrent,
}: LeagueFilterButtonProps) => (
  <Button onClick={onClick} isCurrent={isCurrent}>
    <div className={classes.logo}>
      <img className={classes.logoIcon} src={logo} alt="" />
    </div>
    {leagueName}
  </Button>
);
