import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Select } from "@/components/inputs";
import MenuItem from "@mui/material/MenuItem";

import { useState } from "react";
import { useGet } from "@/hooks/UseApi";
import { useTheme, alpha } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import type { ILogEntry } from "@/types/log";
import type { ApiResponse } from "@/hooks/UseApi";
import { useNavigate } from "react-router";
const formatLog = (
  theme: Theme,
  logEntry: ILogEntry,
  idx: number,
  navigate: Function
) => {
  const levelColors = {
    info: theme.palette.success.main,
    warn: theme.palette.warning.main,
    error: theme.palette.error.main,
    debug: theme.palette.accent.main,
  };

  const color =
    levelColors[logEntry.level] || theme.palette.primary.contrastText;

  return (
    <Box
      key={logEntry.timestamp + idx}
      onClick={() => {
        navigate(`/diagnostics/log`, { state: { logEntry } });
      }}
      mt={4}
      bgcolor={alpha(color, 0.1)}
      sx={{
        cursor: "pointer",
        padding: theme.spacing(4),
        borderRadius: theme.shape.borderRadius,
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: theme.palette.primary.lowContrast,
      }}
    >
      <span>
        <span>[{logEntry.timestamp}]</span>{" "}
        <span style={{ color, fontWeight: "bold" }}>
          {logEntry.level.toUpperCase()}
        </span>
        {": "}
        {`(${logEntry.service})`}
        {": "}
        {logEntry.message}
        <br />
      </span>
    </Box>
  );
};

export const DiagnosticsLogTab = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [logLevel, setLogLevel] = useState("all");
  const { response } = useGet<ApiResponse<ILogEntry[]>>(
    `/diagnostic/logs`,
    {},
    { refreshInterval: 5000 }
  );

  const logEntries = response?.data || [];

  return (
    <Stack spacing={theme.spacing(4)}>
      <Stack direction="row" spacing={theme.spacing(4)} alignItems={"center"}>
        <Typography variant="h2">Log level: </Typography>
        <Select
          value={logLevel}
          onChange={(e) => {
            setLogLevel(e.target.value);
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="error">Error</MenuItem>
          <MenuItem value="warn">Warn</MenuItem>
          <MenuItem value="info">Info</MenuItem>
          <MenuItem value="debug">Debug</MenuItem>
        </Select>
      </Stack>

      <code>
        {logEntries
          .filter((log: ILogEntry) => {
            if (logLevel === "all") return true;
            return log.level === logLevel;
          })
          .map((log: ILogEntry, idx: number) =>
            formatLog(theme, log, idx, navigate)
          )}
      </code>
    </Stack>
  );

  console.log(response);
};
