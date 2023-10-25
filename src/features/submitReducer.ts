import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  isSubmitting: boolean
};

const initialState: State = {
  isSubmitting: false
};

const submitting = createSlice({
  name: 'isSumbitting',
  initialState,
  reducers: {
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

export default submitting.reducer;
export const { setSubmitting } = submitting.actions;