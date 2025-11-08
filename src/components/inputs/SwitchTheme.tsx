import IconButton from "@mui/material/IconButton";
import { StyledTooltip } from "./StyledTooltip";
import { useAppDispatch, useAppSelector } from "@/hooks/AppHooks";
import { setMode } from "@/features/uiSlice.js";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export const ThemeSwitch = () => {
  const mode = useAppSelector((state: any) => state.ui.mode);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleChange = () => {
    dispatch(setMode(mode === "light" ? "dark" : "light"));
  };

  return (
    <StyledTooltip title={t("common.buttons.toggleTheme")} placement="top">
      <IconButton
        id="theme-toggle"
        onClick={handleChange}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "& svg": {
            transition: "stroke 0.2s ease",
          },
          "&:hover svg path, &:hover svg line, &:hover svg polyline, &:hover svg rect, &:hover svg circle":
            {
              stroke: theme.palette.accent.main,
            },
        }}
      >
        {mode === "light" ? (
          <Moon size={16} strokeWidth={1.5} />
        ) : (
          <Sun size={16} strokeWidth={1.5} />
        )}
      </IconButton>
    </StyledTooltip>
  );
};
