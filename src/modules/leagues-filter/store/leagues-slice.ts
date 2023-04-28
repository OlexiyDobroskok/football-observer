import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LeagueInformation, SeasonDefinition } from "api/types/leagues-types";
import { fetchLeagues } from "./leagues-thunk";

interface LeaguesState {
  availableLeagues: LeagueInformation[];
  availableSeasons: SeasonDefinition[];
  currentLeagueId: number;
  currentSeason: number;
  searchQuery: string;
  filteredLeagues: LeagueInformation[];
  isLoading: boolean;
  error: string;
}

const initialState: LeaguesState = {
  availableLeagues: [],
  availableSeasons: [],
  currentLeagueId: 39,
  currentSeason: 2022,
  searchQuery: "",
  filteredLeagues: [],
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
    setSearchLeaguesQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
      const minLength = 3;
      state.filteredLeagues =
        payload.length >= minLength
          ? state.availableLeagues.filter(({ league, country }) =>
              `${league.name} ${country.name}`
                .toLowerCase()
                .includes(payload.trim().toLowerCase())
            )
          : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeagues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLeagues.fulfilled, (state, { payload }) => {
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
      })
      .addCase(fetchLeagues.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.error = payload ? payload : error.message ? error.message : "";
      });
  },
});

export const { setCurrentLeague, setCurrentSeason, setSearchLeaguesQuery } =
  leaguesSlice.actions;
export const leaguesReducer = leaguesSlice.reducer;
