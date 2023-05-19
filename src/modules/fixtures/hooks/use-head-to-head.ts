import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchHeadToHeadFixtureInfo } from "../store/head-to-head-thunk";

export const useHeadToHead = () => {
  const headToHeadState = useAppSelector(({ headToHead }) => headToHead);
  const { homeTeamId, awayTeamId } = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (homeTeamId && awayTeamId)
      dispatch(fetchHeadToHeadFixtureInfo({ homeTeamId, awayTeamId }));
  }, [homeTeamId, awayTeamId]);

  return headToHeadState;
};
