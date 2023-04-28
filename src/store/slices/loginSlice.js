import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isUser: null,
  showLogin: false,
  showRegister: false,
  showComponyLogin: false,
  isLoading: true,
};

const loginSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    changeIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    changeIsUser(state, action) {
      state.isUser = action.payload;
    },
    changeCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    onClickSignUp(state) {
      state.currentUser = null;
    },

    openLogin(state) {
      state.showLogin = true;
      state.showRegister = false;
    },
    openRegister(state) {
      state.showLogin = false;
      state.showRegister = true;
    },

    openComponyLogin(state) {
      state.showComponyLogin = true;
    },

    closeLoginModal(state) {
      state.showLogin = false;
      state.showRegister = false;
      state.showComponyLogin = false;
    },
  },
});

export const currentSelector = (state) => state.loginSlice.currentUser;

export const {
  openLogin,
  openRegister,
  closeLoginModal,
  openComponyLogin,
  changeIsUser,
  addCurrentCompany,
  changeCurrentUser,
  onClickSignUp,
  changeIsLoading,
} = loginSlice.actions;
export default loginSlice.reducer;
