import { Fixture } from "api/types/fixtures-types";

export interface DayFixtures {
  date: string;
  fixtures: Fixture[];
}

type SortMethod = "ASCENDING" | "DESCENDING";

export const dayFixturesConverter = (
  fixtures: Fixture[],
  sortMethod: SortMethod = "ASCENDING"
) => {
  let eventDate: Date;

  return [...fixtures]
    .sort((firstFixture, secondFixture) =>
      sortMethod === "DESCENDING"
        ? secondFixture.fixture.timestamp - firstFixture.fixture.timestamp
        : firstFixture.fixture.timestamp - secondFixture.fixture.timestamp
    )
    .map(({ fixture }, _, fixtures): DayFixtures | null => {
      const matchDate = new Date(fixture.date);
      const matchDay = matchDate.getDate();
      const matchMonth = matchDate.getMonth();
      const matchYear = matchDate.getFullYear();
      const isSameDate =
        eventDate &&
        eventDate.getDate() === matchDay &&
        eventDate.getMonth() === matchMonth &&
        eventDate.getFullYear() === matchYear;
      if (!isSameDate) {
        eventDate = matchDate;
        const dayFixtures = fixtures.filter(({ fixture }) => {
          const date = new Date(fixture.date);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
          return (
            eventDate.getDate() === day &&
            eventDate.getMonth() === month &&
            eventDate.getFullYear() === year
          );
        });
        return {
          date: matchDate.toISOString(),
          fixtures: dayFixtures,
        };
      }
      return null;
    })
    .filter((dayFixtures) => dayFixtures !== null) as DayFixtures[];
};
