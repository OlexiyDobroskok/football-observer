export const getTimeToMatch = (matchDate: string) => {
  const currentDate = Date.now();
  const nextLiveMatchDate = new Date(matchDate).getTime();
  const timeToLiveMatch = nextLiveMatchDate - currentDate;

  return timeToLiveMatch < 0 ? null : timeToLiveMatch;
};
