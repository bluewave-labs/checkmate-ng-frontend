import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import type { TooltipProps } from "@mui/material/Tooltip";

type StyledTooltipProps = Omit<TooltipProps, "componentsProps"> & {
  children: React.ReactElement;
};

export const StyledTooltip: React.FC<StyledTooltipProps> = ({ children, ...props }) => {
  const theme = useTheme();

  return (
    <Tooltip
      {...props}
      componentsProps={{
        tooltip: {
          sx: {
            background: theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
              : "linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)",
            backgroundColor: "transparent",
            color: "#ffffff",
            fontSize: "13px",
            fontWeight: 400,
            lineHeight: 1.6,
            padding: `${theme.spacing(4)} ${theme.spacing(5)}`,
            borderRadius: `${theme.shape.borderRadius}px`,
            border: theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            maxWidth: "320px",
          },
        },
        arrow: {
          sx: {
            color: theme.palette.mode === "dark" ? "#1a1a2e" : "#2c3e50",
            "&::before": {
              border: theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "1px solid rgba(255, 255, 255, 0.15)",
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};
