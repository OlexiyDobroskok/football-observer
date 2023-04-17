import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLeagues } from "modules/leagues-filter/store/leagues-thunk";
import { LeagueInformation, SeasonDefinition } from "api/types/leagues-types";

interface LeaguesState {
  availableLeagues: LeagueInformation[];
  availableSeasons: SeasonDefinition[];
  currentLeagueId: number;
  currentSeason: number;
  searchQuery: string;
  isLoading: boolean;
  error: string;
}

const initialState: LeaguesState = {
  availableLeagues: [],
  availableSeasons: [],
  currentLeagueId: 39,
  currentSeason: 2022,
  searchQuery: "",
  isLoading: false,
  error: "",
};

const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setCurrentLeague: (state, { payload }: PayloadAction<number>) => {
      state.currentLeagueId = payload;
      const leagueInformation = state.availableLeagues?.find(
        ({ league: { id } }) => id === state.currentLeagueId
      );
      const leagueSeasons = leagueInformation
        ? leagueInformation.seasons.sort(
            (seasonFirst, seasonSecond) => seasonFirst.year - seasonSecond.year
          )
        : [];
      state.currentSeason = leagueSeasons[leagueSeasons.length - 1]?.year;
    },
    setCurrentSeason: (state, { payload }: PayloadAction<number>) => {
      state.currentSeason = payload;
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeagues.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLeagues.fulfilled, (state, { payload }) => {
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
      state.error = "";
      state.availableLeagues = payload;
    });
    builder.addCase(fetchLeagues.rejected, (state, { payload, error }) => {
      state.isLoading = false;
      state.error = payload ? payload : error.message ? error.message : "";
    });
  },
});

export const { setCurrentLeague, setCurrentSeason, setSearchQuery } =
  leaguesSlice.actions;
export const leaguesReducer = leaguesSlice.reducer;
