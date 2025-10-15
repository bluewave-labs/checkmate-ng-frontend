import { useTheme, styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch, useAppSelector } from "@/hooks/AppHooks";
import { setMode } from "@/features/uiSlice.js";
import { useTranslation } from "react-i18next";
import { useId } from "react";

const SunAndMoon = styled("svg")<{ mode: string }>(({ theme, mode }) => ({
  width: 24,
  height: 24,
  "& > .moon, & > .sun, & > .sun-beams": {
    transformOrigin: "center",
    transition: "all 0.5s ease",
  },
  "& > .sun-beams": {
    strokeWidth: 2,
    transition: "all 0.5s ease",
  },
  ...(mode === "dark" && {
    "& > .sun": {
      transform: "scale(1.75)",
    },
    "& > .sun-beams": {
      opacity: 0,
    },
    "& > .moon circle": {
      transform: "translateX(0)", // or cx adjustment
    },
  }),
}));

const SunAndMoonIcon = ({ mode }: { mode: string }) => {
  const theme = useTheme();
  const maskId = useId(); // unique ID for mask

  return (
    <SunAndMoon mode={mode} viewBox="0 0 24 24" aria-hidden="true">
      <mask id={maskId}>
        <rect width="100%" height="100%" fill="#fff" />
        <circle
          className="moon"
          cx={mode === "dark" ? 17 : 24} // dark mode moves moon into sun
          cy="10"
          r="6"
          fill="#000"
        />
      </mask>
      <circle
        className="sun"
        cx="12"
        cy="12"
        r="6"
        fill={theme.palette.primary.contrastTextSecondary}
        mask={`url(#${maskId})`}
      />
      <g
        className="sun-beams"
        stroke={theme.palette.primary.contrastTextSecondary}
      >
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </g>
    </SunAndMoon>
  );
};

export const ThemeSwitch = ({ width = 48, height = 48 }) => {
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
      className={`theme-${mode}`}
      aria-label="auto"
      aria-live="polite"
      onClick={handleChange}
      sx={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SunAndMoonIcon mode={mode} />
    </IconButton>
  );
};
