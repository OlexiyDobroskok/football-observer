import { configureStore } from "@reduxjs/toolkit";
import { standingsReducer } from "modules/standings";

export const store = configureStore({
  reducer: {
    standings: standingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
