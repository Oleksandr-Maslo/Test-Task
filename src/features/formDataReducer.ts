import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type State = {
  formData: {
    login: string,
    password: string,
  },

  formErrors: {
    loginError: boolean,
    passwordError: boolean,
    submitError: boolean,
  };
};

const initialState: State = {
  formData: { login: '', password: '' },
  formErrors: { loginError: false, passwordError: false, submitError: false },
};

const formData = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<string>) => {
      state.formData.login = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.formData.password = action.payload;
    },

    setLoginError: (state, action: PayloadAction<boolean>) => {
      state.formErrors.loginError = action.payload;
    },

    setPasswordError: (state, action: PayloadAction<boolean>) => {
      state.formErrors.passwordError = action.payload;
    },

    setSubmitError: (state, action: PayloadAction<boolean>) => {
      state.formErrors.submitError = action.payload;
    },
  },
});

export default formData.reducer;
export const {
  setLogin,
  setPassword,
  setLoginError,
  setPasswordError,
  setSubmitError,
} = formData.actions;