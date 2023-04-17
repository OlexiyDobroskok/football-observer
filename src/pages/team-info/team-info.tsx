import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchTeamInformation } from "pages/team-info/store/team-information-thunk";
import { Loader } from "ui/loader/loader";
import { TeamStatTable } from "modules/team-statistic/components/team-stat-table/team-stat-table";

export const TeamInfo = () => {
  const { teamInformation, isLoading } = useAppSelector(
    ({ teamInfo }) => teamInfo
  );
  const { teamId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    teamId && dispatch(fetchTeamInformation(+teamId));
  }, []);

  if (teamInformation) {
    const { name: teamName, founded, country, logo } = teamInformation.team;
    const { id, name: stadiumName, image } = teamInformation.venue;

    return (
      <>
        {isLoading && <Loader />}
        {!isLoading && (
          <>
            <h1>{teamName}</h1>
            <p>{`(${country}.${founded})`}</p>
            <img src={logo} alt="" />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Sorry! Team information, not found...</h1>
    </>
  );
};
