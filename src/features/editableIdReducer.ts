import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  editableId: number | null,
  editableCell: string | null,
};

const initialState: State = {
  editableId: null,
  editableCell: null,
};

const editable = createSlice({
  name: 'editable',
  initialState,
  reducers: {
    setEditableId: (state, action: PayloadAction<number | null>) => {
      state.editableId = action.payload;
    },

    setEditableCell: (state, action: PayloadAction<string | null>) => {
      state.editableCell = action.payload;
    },
  },
});

export default editable.reducer;
export const { setEditableId, setEditableCell } = editable.actions;