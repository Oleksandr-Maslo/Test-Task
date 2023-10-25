import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from '../features/formDataReducer';
import submitReducer from '../features/submitReducer';
import usersReducer from '../features/usersReducer';
import sortTypeReducer from '../features/sortTypeReducer';
import editableIdReducer from '../features/editableIdReducer';
import newValueReducer from '../features/newValueReducer';
import isLoggedReducer from '../features/isLoggedReducer';
import tableDataReducer from '../features/tableDataReducer';

export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    isSubmitting: submitReducer,
    isLogged: isLoggedReducer,
    users: usersReducer,
    sortType: sortTypeReducer,
    editable: editableIdReducer,
    newValue: newValueReducer,
    tableData: tableDataReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
