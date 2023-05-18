import classes from "./ClubLogo.module.scss";

export interface ClubLogoProps {
  logo: string;
  logoSize?: "SM" | "MD" | "LG";
}

export const ClubLogo = ({ logo, logoSize }: ClubLogoProps) => (
  <div
    className={[
      classes.logo,
      logoSize === "SM"
        ? classes.sm
        : logoSize === "MD"
        ? classes.md
        : classes.lg,
    ].join(" ")}
  >
    <img className={classes.logoIcon} src={logo} alt="" />
  </div>
);
