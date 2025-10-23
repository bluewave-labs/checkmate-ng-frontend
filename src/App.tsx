import CssBaseline from "@mui/material/CssBaseline";
import AppRoutes from "@/routes/Router";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "@/theme/theme";
import { I18nLoader } from "@/components/i18nLoader";
import { useAppSelector } from "./hooks/AppHooks";
import { BrowserRouter } from "react-router-dom";
import { AuthVerifier } from "@/components/auth-verifier";
function App() {
  const mode = useAppSelector((state) => state.ui.mode);

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <I18nLoader />
      <BrowserRouter>
        <AuthVerifier>
          <AppRoutes />
        </AuthVerifier>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
