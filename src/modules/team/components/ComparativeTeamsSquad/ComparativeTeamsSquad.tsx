import { useAppDispatch, useAppSelector } from "hooks/redux";
import { ChangeEvent, useEffect, useState } from "react";
import { fetchComparativeTeamsSquad } from "../../store/comparative-teams-squad-thunk";
import { TeamSquad } from "../TeamSquad/TeamSquad";
import { RadioButtonsGroup } from "ui/RadioButtonsGroup/RadioButtonsGroup";
import classes from "./ComparativeTeamsSquad.module.scss";

export const ComparativeTeamsSquad = () => {
  const { homeTeamSquad, awayTeamSquad } = useAppSelector(
    ({ compSquad }) => compSquad
  );
  const [selectedTeam, setSelectedTeam] = useState(homeTeamSquad?.team.name);
  const { homeTeam, awayTeam } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const dispatch = useAppDispatch();
  const teamsNames =
    homeTeamSquad && awayTeamSquad
      ? [homeTeamSquad.team.name, awayTeamSquad.team.name]
      : [];

  useEffect(() => {
    if (homeTeam && awayTeam)
      dispatch(
        fetchComparativeTeamsSquad({
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
        })
      );
  }, [homeTeam, awayTeam]);

  useEffect(() => {
    if (homeTeamSquad) setSelectedTeam(homeTeamSquad.team.name);
  }, [homeTeamSquad]);

  const changeTeam = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setSelectedTeam(target.value);

  return (
    <>
      {homeTeamSquad && awayTeamSquad && (
        <div className={classes.compSquad}>
          <div className={classes.buttonsGroup}>
            <RadioButtonsGroup
              groupName={"teams-squads"}
              buttonsNames={teamsNames}
              selectedButton={selectedTeam}
              onChange={changeTeam}
            />
          </div>
          {selectedTeam === homeTeamSquad.team.name && (
            <TeamSquad teamSquad={homeTeamSquad} />
          )}
          {selectedTeam === awayTeamSquad.team.name && (
            <TeamSquad teamSquad={awayTeamSquad} />
          )}
        </div>
      )}
      {!homeTeamSquad && !awayTeamSquad && (
        <p>Sorry, Teams Squads Information Not Found...</p>
      )}
    </>
  );
};
