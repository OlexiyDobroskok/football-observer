import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { fetchFixtureDetail } from "../store/fixture-detail-thunk";
import { resetFixtureDetailReqStatus } from "../store/fixture-detail-slice";

const a = [1, 2, 3];

export const useFixtureDetail = () => {
  const { fixtureId } = useParams<"fixtureId">();
  const fixtureDetailState = useAppSelector(
    ({ fixtureDetail }) => fixtureDetail
  );
  const { isLive } = fixtureDetailState;
  const dispatch = useAppDispatch();
  const intervalIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (fixtureId) {
      dispatch(fetchFixtureDetail({ fixtureId }));

      if (isLive) {
        intervalIdRef.current = window.setInterval(() => {
          dispatch(resetFixtureDetailReqStatus());
          dispatch(fetchFixtureDetail({ fixtureId }));
        }, 30000);
      }
    }

    return () => {
      if (isLive) dispatch(resetFixtureDetailReqStatus());
      if (intervalIdRef.current) window.clearInterval(intervalIdRef.current);
    };
  }, [fixtureId, isLive]);

  return fixtureDetailState;
};
