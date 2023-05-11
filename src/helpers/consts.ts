export const PAGE_ROUTES = {
  ROOT: "/",
  HOME: "/",
  FIXTURES: "/fixtures",
  FIXTURE_DETAIL: "/fixtures/:fixtureId",
  STANDINGS: "/standings",
  TEAMS: "/teams",
  TEAM_INFO: "/teams/:teamId",
  PROFILE: "/profile",
} as const;

export type Page = keyof typeof PAGE_ROUTES;
export type PagePath = (typeof PAGE_ROUTES)[Page];
