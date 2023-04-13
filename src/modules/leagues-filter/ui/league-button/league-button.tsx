import { FC, MouseEventHandler } from "react";
import { Button } from "ui/button/button";
import classes from "./league-button.module.scss";

interface LeagueButtonProps {
  leagueName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  logo: string;
  isCurrent?: boolean;
}

export const LeagueButton: FC<LeagueButtonProps> = ({
  leagueName,
  logo,
  onClick,
  isCurrent,
}) => {
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
