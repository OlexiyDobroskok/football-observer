import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { useAppSelector } from "hooks/redux";
import { TeamCard } from "modules/team/components/TeamCard/TeamCard";

export const Team = () => {
  const { teamInformation } = useAppSelector(({ teamInfo }) => teamInfo);
  return (
    <>
      <HiddenElement as={"h1"}>{`${
        teamInformation ? teamInformation.team.name : ""
      } Team Page`}</HiddenElement>
      <TeamCard />
    </>
  );
};
