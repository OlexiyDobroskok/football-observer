import { configureStore } from "@reduxjs/toolkit";
import { standingsReducer } from "modules/standings";
import { leaguesReducer } from "modules/leagues-filter/store/leagues-slice";
import { modalsReducer } from "store/modals-slice";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    leagues: leaguesReducer,
    standings: standingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
