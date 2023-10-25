import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  newValue: string | null,
};

const initialState: State = {
  newValue: null,
};

const newValue = createSlice({
  name: 'newValue',
  initialState,
  reducers: {
    setNewValue: (state, action: PayloadAction<string>) => {
      state.newValue = action.payload;
    },
  },
});

export default newValue.reducer;
export const { setNewValue } = newValue.actions;