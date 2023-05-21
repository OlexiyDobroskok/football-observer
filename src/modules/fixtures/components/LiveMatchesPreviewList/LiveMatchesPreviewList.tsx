import { useFixtures } from "../../hooks/use-fixtures";
import { LiveMatchPreview } from "../LiveMatchPreview/LiveMatchPreview";
import classes from "./LiveMatchesPreviewList.module.scss";

export const LiveMatchesPreviewList = () => {
  const { liveMatches } = useFixtures();

  if (liveMatches) {
    const previewList = liveMatches.map((liveMatchInfo) => (
      <div className={classes.previewCard} key={liveMatchInfo.fixture.id}>
        <LiveMatchPreview matchInfo={liveMatchInfo} />
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
            Sorry, there is not a single live match...
          </p>
        )}
      </>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
