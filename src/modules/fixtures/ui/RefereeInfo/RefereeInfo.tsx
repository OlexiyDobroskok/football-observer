import whistleIcon from "./whistle.svg";
import classes from "./RefereeInfo.module.scss";

export interface RefereeInfoProps {
  refereeName: string;
}

export const RefereeInfo = ({ refereeName }: RefereeInfoProps) => (
  <div className={classes.container}>
    <img className={classes.icon} src={whistleIcon} alt="" />
    <p className={classes.name}>{refereeName}</p>
  </div>
);
