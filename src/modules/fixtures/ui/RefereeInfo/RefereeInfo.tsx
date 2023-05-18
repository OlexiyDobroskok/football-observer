import whistleIcon from "./whistle.svg";
import classes from "./RefereeInfo.module.scss";

export interface RefereeInfoProps {
  refereeName: string;
}

export const RefereeInfo = ({ refereeName }: RefereeInfoProps) => (
  <div className={classes.referee}>
    <img className={classes.refereeIcon} src={whistleIcon} alt="" />
    <p className={classes.refereeName}>{refereeName}</p>
  </div>
);
