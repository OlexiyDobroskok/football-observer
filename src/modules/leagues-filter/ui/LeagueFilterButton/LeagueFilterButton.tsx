import { Button, ButtonProps } from "ui/Button/Button";
import classes from "./LeagueFilterButton.module.scss";

interface LeagueButtonProps extends ButtonProps {
  leagueName: string;
  logo: string;
}

export const LeagueFilterButton = ({
  leagueName,
  logo,
  onClick,
  isCurrent,
}: LeagueButtonProps) => (
  <Button onClick={onClick} isCurrent={isCurrent}>
    <div className={classes.wrap}>
      <img className={classes.logo} src={logo} alt="" />
    </div>
    {leagueName}
  </Button>
);
