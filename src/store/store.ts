import { configureStore } from "@reduxjs/toolkit";
import { standingsReducer } from "modules/standings";
import { leaguesReducer } from "modules/leagues-filter";
import { modalsReducer } from "store/modals-slice";
import {
  fixtureDetailReducer,
  fixturesReducer,
  headToHeadReducer,
} from "modules/fixtures";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    leagues: leaguesReducer,
    standings: standingsReducer,
    fixtures: fixturesReducer,
    fixtureDetail: fixtureDetailReducer,
    headToHead: headToHeadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
