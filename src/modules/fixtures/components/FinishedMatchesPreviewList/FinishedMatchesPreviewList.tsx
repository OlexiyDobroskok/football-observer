import { useFixtures } from "../../hooks/use-fixtures";
import { FinishedMatchPreview } from "../FinishedMatchPreview/FinishedMatchPreview";
import classes from "./FinishedMatchesPreviewList.module.scss";

export const FinishedMatchesPreviewList = () => {
  const { finishedMatches } = useFixtures();

  if (finishedMatches && finishedMatches.length) {
    const [latestMatchDay] = finishedMatches;
    const latestMatches = latestMatchDay.fixtures;
    const previewList = latestMatches.map((finishedMatchInfo) => (
      <div className={classes.previewCard} key={finishedMatchInfo.fixture.id}>
        <FinishedMatchPreview matchInfo={finishedMatchInfo} />
      </div>
    ));

    const isSingleMatch = previewList.length === 1;

    return (
      <>
        {!!previewList.length && (
          <div
            className={[
              classes.previewList,
              isSingleMatch && classes.single,
            ].join(" ")}
          >
            {previewList}
          </div>
        )}
        {!previewList.length && (
          <p className={classes.message}>Sorry, no matches were played...</p>
        )}
      </>
    );
  }

  return <p className={classes.message}>Sorry, Matches Not Found...</p>;
};
