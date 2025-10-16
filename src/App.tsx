import CssBaseline from "@mui/material/CssBaseline";
import Routes from "@/routes/Router";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/theme/theme";
import { I18nLoader } from "@/components/i18nLoader";
import { useAppSelector } from "./hooks/AppHooks";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch } from "./hooks/AppHooks";
import {
  setUser,
  setSelectedTeamId,
  setAuthenticated,
} from "@/features/authSlice";
import { useState, useEffect } from "react";
import { setTeamHeader } from "./utils/ApiClient";
const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const AppInit = ({ children }: { children: React.ReactNode }) => {
  const [initialized, setInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const init = async () => {
      if (
        location.pathname === "/login" ||
        location.pathname.startsWith("/register")
      ) {
        setInitialized(true);
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const apiResponse = await res.json();
        const user = apiResponse.data;
        if (!user) {
          throw new Error("No user data");
        }

        const teams = user.teamIds;
        if (!teams || teams.length === 0) {
          throw new Error("User has no teams");
        }

        const defaultTeam = teams[0];

        dispatch(setAuthenticated(true));
        dispatch(setUser(user));
        dispatch(setSelectedTeamId(defaultTeam));
        setTeamHeader(defaultTeam);
        setInitialized(true);
      } catch (error) {
        console.error(error);
        dispatch(setAuthenticated(false));
        dispatch(setUser(null));
        dispatch(setSelectedTeamId(null));
        setTeamHeader(null);
        navigate("/login", { replace: true });
        return;
      }
    };
    init();
  }, [navigate, dispatch, location.pathname]);

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};

function App() {
  const mode = useAppSelector((state) => state.ui.mode);

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <I18nLoader />
      <AppInit>
        <Routes />
      </AppInit>
    </ThemeProvider>
  );
}

export default App;
