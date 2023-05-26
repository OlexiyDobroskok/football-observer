export const getExtraMinute = ({
  periodStartTime,
}: {
  periodStartTime: number | null;
}) => {
  if (!periodStartTime) return null;

  const sec = 1000;
  const min = 60 * sec;
  const periodTime = 45 * min;
  const periodStartTimeMs = periodStartTime * 1000;
  const timeNow = Date.now();

  const extraMinute = Math.floor(
    (periodTime - (timeNow - periodStartTimeMs)) * min
  );

  return extraMinute > 0 ? extraMinute : null;
};
