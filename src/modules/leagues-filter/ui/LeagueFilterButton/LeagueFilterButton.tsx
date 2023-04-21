import { MouseEventHandler } from "react";
import { Button } from "ui/Button/Button";
import classes from "./LeagueFilterButton.module.scss";

interface LeagueButtonProps {
  leagueName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  logo: string;
  isCurrent?: boolean;
}

export const LeagueFilterButton = ({
  leagueName,
  logo,
  onClick,
  isCurrent,
}: LeagueButtonProps) => {
  const buttonClass = isCurrent
    ? [classes.button, classes.current].join(" ")
    : classes.button;

  return (
    <Button className={buttonClass} onClick={onClick}>
      <div className={classes.wrap}>
        <img className={classes.logo} src={logo} alt="" />
      </div>
      {leagueName}
    </Button>
  );
};
