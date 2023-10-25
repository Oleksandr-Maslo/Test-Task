import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  isLogged: boolean,
};

const initialState: State = {
  isLogged: false,
};

const logged = createSlice({
  name: 'isLogged',
  initialState,
  reducers: {
    setIsLogged: (state, action: PayloadAction<boolean>) => {
      state.isLogged = action.payload;
    },
  },
});

export default logged.reducer;
export const { setIsLogged } = logged.actions;