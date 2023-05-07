import { FixtureVenue } from "api/types/fixtures-types";
import stadiumIcon from "./stadium.svg";
import classes from "./StadiumInfo.module.scss";

export interface StadiumInfoProps {
  stadium: FixtureVenue;
}

export const StadiumInfo = ({ stadium: { name, city } }: StadiumInfoProps) => (
  <div className={classes.container}>
    <img className={classes.icon} src={stadiumIcon} alt="" />
    <p className={classes.description}>{`${name}, ${city}`}</p>
  </div>
);
