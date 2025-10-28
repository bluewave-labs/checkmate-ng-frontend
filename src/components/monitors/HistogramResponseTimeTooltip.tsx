import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { formatDateWithTz } from "@/utils/TimeUtils";
import { useSelector } from "react-redux";
import type { LatestCheck } from "@/types/check";
import { useTheme } from "@mui/material/styles";

export const HistogramResponseTimeTooltip: React.FC<{
  children: React.ReactElement;
  check: LatestCheck;
}> = ({ children, check }) => {
  const uiTimezone = useSelector((state: any) => state.ui.timezone);
  const theme = useTheme();
  return (
    <Tooltip
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: "transparent",
            color: "inherit",
            boxShadow: "none",
          },
        },
      }}
      title={
        <Stack
          sx={{
            backgroundColor: theme.palette.secondary.main,
            border: 1,
            borderColor: theme.palette.primary.lowContrast,
            borderRadius: theme.shape.borderRadius,
            p: theme.spacing(4),
          }}
        >
          <Typography>
            {formatDateWithTz(
              check?.checkedAt,
              "ddd, MMMM D, YYYY, HH:mm A",
              uiTimezone
            )}
          </Typography>
          {check?.responseTime && (
            <Typography>Response Time: {check.responseTime} ms</Typography>
          )}
        </Stack>
      }
    >
      {children}
    </Tooltip>
  );
};
