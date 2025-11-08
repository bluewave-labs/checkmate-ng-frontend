import { BasePage } from "@/components/design-elements";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useTheme, alpha } from "@mui/material/styles";
import { useLocation } from "react-router";
import type { ILogEntry } from "@/types/log";

const logKeysOrder: (keyof ILogEntry)[] = [
  "timestamp",
  "level",
  "service",
  "message",
  "stack",
];

const DiagnosticLogDetailsPage = () => {
  const { state } = useLocation();
  const theme = useTheme();

  if (!state || !state.logEntry) {
    return (
      <BasePage>
        <Typography variant="h2">No log entry selected</Typography>
        <Typography variant="body1">
          Please navigate to this page by clicking on a log entry from the diagnostics page.
        </Typography>
      </BasePage>
    );
  }

  const logEntry: ILogEntry = state.logEntry;
  const levelColors = {
    info: theme.palette.success.main,
    warn: theme.palette.warning.main,
    error: theme.palette.error.main,
    debug: theme.palette.accent.main,
  };

  const color =
    levelColors[logEntry.level] || theme.palette.primary.contrastText;

  return (
    <BasePage>
      {logKeysOrder.map((key) => {
        if (!logEntry[key]) {
          return null;
        }

        return (
          <Stack
            key={key}
            spacing={theme.spacing(2)}
            bgcolor={alpha(color, 0.1)}
            sx={{
              p: theme.spacing(4),
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: theme.palette.primary.lowContrast,
              borderRadius: theme.shape.borderRadius,
            }}
          >
            <Typography variant="h2" textTransform={"capitalize"}>
              {key}
            </Typography>
            <Typography
              sx={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}
            >
              {logEntry[key]}
            </Typography>
          </Stack>
        );
      })}
    </BasePage>
  );
};

export default DiagnosticLogDetailsPage;
