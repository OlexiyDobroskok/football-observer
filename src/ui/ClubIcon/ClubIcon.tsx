import classes from "./ClubIcon.module.scss";

interface ClubIconProps {
  icon: string;
}

export const ClubIcon = ({ icon }: ClubIconProps) => (
  <div className={classes.container}>
    <img className={classes.icon} src={icon} alt="" />
  </div>
);
