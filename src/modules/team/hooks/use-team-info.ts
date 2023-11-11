import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchTeamInformation } from "../store/team-information-thunk";

export const useTeamInfo = () => {
  const teamInfoState = useAppSelector(({ teamInfo }) => teamInfo);
  const { teamId } = useParams<"teamId">();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (teamId) dispatch(fetchTeamInformation({ teamId }));
  }, [teamId]);

  return teamInfoState;
};
