import Tooltip from "@mui/material/Tooltip";
import { Info } from "lucide-react";
import { useTheme } from "@mui/material/styles";

type TooltipInfoProps = {
  title: string;
  placement?: "top" | "bottom" | "left" | "right";
  iconSize?: number;
  iconColor?: string;
};

export const TooltipInfo: React.FC<TooltipInfoProps> = ({
  title,
  placement = "top",
  iconSize = 14,
  iconColor,
}) => {
  const theme = useTheme();
  const defaultColor = theme.palette.primary.contrastTextTertiary;

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow
      slotProps={{
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
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "help",
        }}
      >
        <Info
          size={iconSize}
          strokeWidth={1.5}
          style={{
            opacity: 0.7,
            color: iconColor || defaultColor,
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
        />
      </span>
    </Tooltip>
  );
};
