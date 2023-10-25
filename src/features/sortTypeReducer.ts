import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortType } from "../types/SortType";

type State = {
  sortType: SortType,
};

const initialState: State = {
  sortType: SortType.NONE,
};

const sortTypeReducer = createSlice({
  name: 'sortType',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export default sortTypeReducer.reducer;
export const { setSortType } = sortTypeReducer.actions;