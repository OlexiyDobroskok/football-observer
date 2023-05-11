import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeagueInformation, SeasonDefinition } from "api/types/leagues-types";
import { fetchLeagues } from "./leagues-thunk";
import { RequestStatus } from "api/types/global";

export interface LeaguesState {
  availableLeagues: LeagueInformation[] | undefined;
  availableSeasons: SeasonDefinition[] | undefined;
  currentLeagueId: number;
  currentSeason: number | undefined;
  searchQuery: string;
  filteredLeagues: LeagueInformation[];
  isLoading: boolean;
  error: string | null;
  reqStatus: RequestStatus;
}

const initialState: LeaguesState = {
  availableLeagues: undefined,
  availableSeasons: undefined,
  currentLeagueId: 39,
  currentSeason: undefined,
  searchQuery: "",
  filteredLeagues: [],
  isLoading: false,
  error: null,
  reqStatus: "idle",
};

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setCurrentLeague: (state, { payload }: PayloadAction<number>) => {
      state.currentLeagueId = payload;
      if (state.availableLeagues) {
        const leagueInformation = state.availableLeagues.find(
          ({ league: { id } }) => id === state.currentLeagueId
        );
        const leagueSeasons = leagueInformation
          ? leagueInformation.seasons.sort(
              (seasonFirst, seasonSecond) =>
                seasonFirst.year - seasonSecond.year
            )
          : [];
        state.currentSeason = leagueSeasons[leagueSeasons.length - 1]?.year;
      }
    },
    setCurrentSeason: (state, { payload }: PayloadAction<number>) => {
      state.currentSeason = payload;
    },
    setSearchLeaguesQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
      if (state.availableLeagues) {
        const minLength = 3;
        state.filteredLeagues =
          payload.length >= minLength
            ? state.availableLeagues.filter(({ league, country }) =>
                `${league.name} ${country.name}`
                  .toLowerCase()
                  .includes(payload.trim().toLowerCase())
              )
            : [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        state.reqStatus = "loading";
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLeagues.fulfilled, (state, { payload }) => {
        state.reqStatus = "succeeded";
        if (payload.length) {
          const currentLeagueInformation = payload.find(
            ({ league: { id } }) => id === state.currentLeagueId
          );
          const leagueSeasons = currentLeagueInformation
            ? currentLeagueInformation.seasons
                .filter(({ coverage }) => coverage.standings)
                .sort(
                  (seasonFirst, seasonSecond) =>
                    seasonFirst.year - seasonSecond.year
                )
            : [];
          state.availableSeasons = leagueSeasons;
          state.currentSeason = leagueSeasons[leagueSeasons.length - 1]?.year;
        }
        state.isLoading = false;
        state.error = null;
        state.availableLeagues = payload;
      })
      .addCase(fetchLeagues.rejected, (state, { payload, error }) => {
        state.reqStatus = "failed";
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      });
  },
});

export const { setCurrentLeague, setCurrentSeason, setSearchLeaguesQuery } =
  leaguesSlice.actions;
export const leaguesReducer = leaguesSlice.reducer;
