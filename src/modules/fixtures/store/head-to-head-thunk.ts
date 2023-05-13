import { createAsyncThunk } from "@reduxjs/toolkit";
import { Fixture, HeadToHeadArgs } from "api/types/fixtures-types";
import { FootballService } from "api/football-service";
import { getH2HStats } from "../helpers/getH2HStats";
import { HeadToHeadState } from "./head-to-head-slice";
import { H2HStats } from "../types/types";
import { generateDynamicKey } from "api/helpers/generateDynamicReqStatus";

interface HeadToHeadData {
  fixtures: Fixture[];
  stats: H2HStats;
}

export const fetchHeadToHeadFixtureInfo = createAsyncThunk<
  HeadToHeadData,
  HeadToHeadArgs,
  { state: { headToHead: HeadToHeadState }; rejectValue: string }
>(
  "headToHead/fetchHeadToHeadFixtureInfo",
  async ({ homeTeamId, awayTeamId }, { rejectWithValue }) => {
    try {
      const fixtures = await FootballService.getHeadToHeadFixtureInfo({
        homeTeamId,
        awayTeamId,
      });
      const descendingSortedFixtures = fixtures
        .filter(({ goals }) => goals.home !== null && goals.away !== null)
        .sort(
          (firstFixture, secondFixture) =>
            secondFixture.fixture.timestamp - firstFixture.fixture.timestamp
        );

      const stats = getH2HStats({ homeTeamId, fixtures });

      return { fixtures: descendingSortedFixtures, stats };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
  {
    condition: (params, { getState }) => {
      const {
        headToHead: { reqStatus },
      } = getState();
      const reqKey = generateDynamicKey({ params });
      const isLoading = !!reqStatus && reqStatus[reqKey] === "loading";
      const isSucceed = !!reqStatus && reqStatus[reqKey] === "succeeded";
      if (isLoading || isSucceed) return false;
    },
  }
);
