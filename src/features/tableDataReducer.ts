import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  tablePage: number,
  totalItems: number,
};

const initialState: State = {
  tablePage: 1,
  totalItems: 0,
};

const tableDataReducer = createSlice({
  name: 'tableData',
  initialState,
  reducers: {
    setTablePage: (state, action: PayloadAction<number>) => {
      state.tablePage = action.payload;
    },

    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
  },
});

export default tableDataReducer.reducer;
export const { setTablePage, setTotalItems } = tableDataReducer.actions;