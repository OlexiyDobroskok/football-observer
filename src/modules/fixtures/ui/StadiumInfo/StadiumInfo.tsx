import { FixtureVenue } from "api/types/fixtures-types";
import stadiumIcon from "./stadium.svg";
import classes from "./StadiumInfo.module.scss";

export interface StadiumInfoProps {
  stadium: FixtureVenue;
}

export const StadiumInfo = ({ stadium: { name, city } }: StadiumInfoProps) => (
  <div className={classes.stadium}>
    <img className={classes.stadiumIcon} src={stadiumIcon} alt="" />
    <p className={classes.stadiumDescription}>{`${name}, ${city}`}</p>
  </div>
);
