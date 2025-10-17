import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface User {
  sub: string;
  email: string;
  exp: number;
  iat: number;
  orgId: string;
  teamIds: string[];
  teams: { _id: string; name: string }[];
}
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  selectedTeamId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  selectedTeamId: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setSelectedTeamId: (state, action: PayloadAction<string | null>) => {
      state.selectedTeamId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuthenticated, setUser, setSelectedTeamId, logout } =
  authSlice.actions;
export default authSlice.reducer;
