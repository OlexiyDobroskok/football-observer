import { useFixtures } from "../../hooks/use-fixtures";
import { ScheduledMatchPreview } from "../ScheduledMatchPreview/ScheduledMatchPreview";
import classes from "./ScheduleMatchesPreviewList.module.scss";

export const ScheduledMatchesPreviewList = () => {
  const { scheduledMatches } = useFixtures();

  if (scheduledMatches && scheduledMatches.length) {
    const [upcomingMatchDay] = scheduledMatches;
    const upcomingMatches = upcomingMatchDay.fixtures;
    const previewList = upcomingMatches.map((upcomingMatchInfo) => (
      <div className={classes.previewCard} key={upcomingMatchInfo.fixture.id}>
        <ScheduledMatchPreview matchInfo={upcomingMatchInfo} />
      </div>
    ));

    const isSingleMatch = previewList.length === 1;
    const previewListClassName = [
      classes.previewList,
      isSingleMatch && classes.single,
    ].join(" ");

    return (
      <>
        {!!previewList.length && (
          <div className={previewListClassName}>{previewList}</div>
        )}
        {!previewList.length && (
          <p className={classes.message}>
            Sorry, there are no scheduled matches...
          </p>
        )}
      </>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
