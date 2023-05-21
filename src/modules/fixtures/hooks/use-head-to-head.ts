import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchHeadToHeadFixtureInfo } from "../store/head-to-head-thunk";

export const useHeadToHead = () => {
  const headToHeadState = useAppSelector(({ headToHead }) => headToHead);
  const { homeTeam, awayTeam } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (homeTeam && awayTeam)
      dispatch(
        fetchHeadToHeadFixtureInfo({
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
        })
      );
  }, [homeTeam, awayTeam]);

  return headToHeadState;
};
