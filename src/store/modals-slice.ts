import { createSlice } from "@reduxjs/toolkit";

interface ModalsState {
  searchModalIsOpen: boolean;
}

const initialState: ModalsState = {
  searchModalIsOpen: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openSearchModal: (state) => {
      state.searchModalIsOpen = true;
    },
    closeModal: (state) => {
      (Object.keys(state) as Array<keyof ModalsState>).forEach((modal) => {
        state[modal] = false;
      });
    },
  },
});

export const { openSearchModal, closeModal } = modalsSlice.actions;
export const modalsReducer = modalsSlice.reducer;
