import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "@/hooks/AppHooks";
import { setMode } from "@/features/uiSlice.js";
import { useTranslation } from "react-i18next";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export const ThemeSwitch = () => {
  const mode = useAppSelector((state: any) => state.ui.mode);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = () => {
    dispatch(setMode(mode === "light" ? "dark" : "light"));
  };

  return (
    <IconButton
      id="theme-toggle"
      title={t("common.buttons.toggleTheme")}
      onClick={handleChange}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
    </IconButton>
  );
};
