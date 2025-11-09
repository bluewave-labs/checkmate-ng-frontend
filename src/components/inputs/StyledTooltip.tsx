import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import type { ReactElement } from "react";

type StyledTooltipProps = {
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
  children: ReactElement;
};

export const StyledTooltip: React.FC<StyledTooltipProps> = ({
  title,
  placement = "top",
  children,
}) => {
  const theme = useTheme();

  return (
    <Tooltip
      title={title}
      placement={placement}
      slotProps={{
        tooltip: {
          sx: {
            background:
              theme.palette.mode === "dark"
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
      {children}
    </Tooltip>
  );
};
