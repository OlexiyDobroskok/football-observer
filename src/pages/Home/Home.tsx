import { HiddenElement } from "ui/HiddenElement/HiddenElement";
import { useEffect } from "react";
import { getCurrentLeaguePosition } from "modules/team/api/team-information/endpoints";
import { FootballService } from "api/football-service";
import { FixturesList } from "modules/fixtures/components/FixturesList/FixturesList";
import { DayFixtures } from "api/types/fixtures-types";
import { PreviewMatchesList } from "modules/fixtures/components/PreviewMatchesList/PreviewMatchesList";
const dammyMatchList: DayFixtures[] = [
  {
    date: "2020-02-06T14:00:00+00:00",
    fixtures: [
      {
        fixture: {
          id: 232625,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 239625,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 239655,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
  {
    date: "2021-05-16T14:00:00+00:00",
    fixtures: [
      {
        fixture: {
          id: 232625,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 239625,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 239655,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
  {
    date: "2023-12-18T14:00:00+00:00",
    fixtures: [
      {
        fixture: {
          id: 232625,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 239625,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: 0,
          away: 1,
        },
        score: {
          halftime: {
            home: 0,
            away: 1,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
      {
        fixture: {
          id: 239655,
          referee: null,
          timezone: "UTC",
          date: "2020-02-06T14:00:00+00:00",
          timestamp: 1580997600,
          periods: {
            first: 1580997600,
            second: null,
          },
          venue: {
            id: 1887,
            name: "Stade Municipal",
            city: "Oued Zem",
          },
          status: {
            long: "Halftime",
            short: "HT",
            elapsed: 45,
          },
        },
        league: {
          id: 200,
          name: "Botola Pro",
          country: "Morocco",
          logo: "https://media.api-sports.io/football/leagues/115.png",
          flag: "https://media.api-sports.io/flags/ma.svg",
          season: 2019,
          round: "Regular Season - 14",
        },
        teams: {
          home: {
            id: 967,
            name: "Rapide Oued ZEM",
            logo: "https://media.api-sports.io/football/teams/967.png",
            winner: false,
          },
          away: {
            id: 968,
            name: "Wydad AC",
            logo: "https://media.api-sports.io/football/teams/968.png",
            winner: true,
          },
        },
        goals: {
          home: null,
          away: null,
        },
        score: {
          halftime: {
            home: null,
            away: null,
          },
          fulltime: {
            home: null,
            away: null,
          },
          extratime: {
            home: null,
            away: null,
          },
          penalty: {
            home: null,
            away: null,
          },
        },
      },
    ],
  },
];

const dammyLiveList = [
  {
    fixture: {
      id: 232625,
      referee: null,
      timezone: "UTC",
      date: "2020-02-06T14:00:00+00:00",
      timestamp: 1580997600,
      periods: {
        first: 1580997600,
        second: null,
      },
      venue: {
        id: 1887,
        name: "Stade Municipal",
        city: "Oued Zem",
      },
      status: {
        long: "Halftime",
        short: "HT",
        elapsed: 45,
      },
    },
    league: {
      id: 200,
      name: "Botola Pro",
      country: "Morocco",
      logo: "https://media.api-sports.io/football/leagues/115.png",
      flag: "https://media.api-sports.io/flags/ma.svg",
      season: 2019,
      round: "Regular Season - 14",
    },
    teams: {
      home: {
        id: 967,
        name: "Rapide Oued ZEM",
        logo: "https://media.api-sports.io/football/teams/967.png",
        winner: false,
      },
      away: {
        id: 968,
        name: "Wydad AC",
        logo: "https://media.api-sports.io/football/teams/968.png",
        winner: true,
      },
    },
    goals: {
      home: 0,
      away: 1,
    },
    score: {
      halftime: {
        home: 0,
        away: 1,
      },
      fulltime: {
        home: null,
        away: null,
      },
      extratime: {
        home: null,
        away: null,
      },
      penalty: {
        home: null,
        away: null,
      },
    },
  },
  {
    fixture: {
      id: 239625,
      referee: null,
      timezone: "UTC",
      date: "2020-02-06T14:00:00+00:00",
      timestamp: 1580997600,
      periods: {
        first: 1580997600,
        second: null,
      },
      venue: {
        id: 1887,
        name: "Stade Municipal",
        city: "Oued Zem",
      },
      status: {
        long: "Halftime",
        short: "HT",
        elapsed: 45,
      },
    },
    league: {
      id: 200,
      name: "Botola Pro",
      country: "Morocco",
      logo: "https://media.api-sports.io/football/leagues/115.png",
      flag: "https://media.api-sports.io/flags/ma.svg",
      season: 2019,
      round: "Regular Season - 14",
    },
    teams: {
      home: {
        id: 967,
        name: "Rapide Oued ZEM",
        logo: "https://media.api-sports.io/football/teams/967.png",
        winner: false,
      },
      away: {
        id: 968,
        name: "Wydad AC",
        logo: "https://media.api-sports.io/football/teams/968.png",
        winner: true,
      },
    },
    goals: {
      home: 0,
      away: 1,
    },
    score: {
      halftime: {
        home: 0,
        away: 1,
      },
      fulltime: {
        home: null,
        away: null,
      },
      extratime: {
        home: null,
        away: null,
      },
      penalty: {
        home: null,
        away: null,
      },
    },
  },
  {
    fixture: {
      id: 239655,
      referee: null,
      timezone: "UTC",
      date: "2020-02-06T14:00:00+00:00",
      timestamp: 1580997600,
      periods: {
        first: 1580997600,
        second: null,
      },
      venue: {
        id: 1887,
        name: "Stade Municipal",
        city: "Oued Zem",
      },
      status: {
        long: "Not Started",
        short: "NS",
        elapsed: null,
      },
    },
    league: {
      id: 200,
      name: "Botola Pro",
      country: "Morocco",
      logo: "https://media.api-sports.io/football/leagues/115.png",
      flag: "https://media.api-sports.io/flags/ma.svg",
      season: 2019,
      round: "Regular Season - 14",
    },
    teams: {
      home: {
        id: 967,
        name: "Rapide Oued ZEM",
        logo: "https://media.api-sports.io/football/teams/967.png",
        winner: false,
      },
      away: {
        id: 968,
        name: "Wydad AC",
        logo: "https://media.api-sports.io/football/teams/968.png",
        winner: true,
      },
    },
    goals: {
      home: null,
      away: null,
    },
    score: {
      halftime: {
        home: null,
        away: null,
      },
      fulltime: {
        home: null,
        away: null,
      },
      extratime: {
        home: null,
        away: null,
      },
      penalty: {
        home: null,
        away: null,
      },
    },
  },
];
export const Home = () => {
  return (
    <>
      <HiddenElement as={"h1"}>Football Observer</HiddenElement>
    </>
  );
};
