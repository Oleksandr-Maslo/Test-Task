import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";

type State = {
  users: User[]
};

const initialState: State = {
  users: [],
};

const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export default usersReducer.reducer;
export const { setUsers } = usersReducer.actions;