import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
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
    <Tooltip
      title={t("common.buttons.toggleTheme")}
      placement="top"
      slotProps={{
        tooltip: {
          sx: {
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
              : "linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)",
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "13px",
            padding: `${theme.spacing(4)} ${theme.spacing(5)}`,
            borderRadius: `${theme.shape.borderRadius}px`,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
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
    </Tooltip>
  );
};
