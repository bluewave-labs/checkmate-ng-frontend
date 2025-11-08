import { LogOut } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useAppDispatch } from "@/hooks/AppHooks";
import { logout } from "@/features/authSlice";
import { usePost } from "@/hooks/UseApi";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";

export const LogoutSwitch = () => {
  const dispatch = useAppDispatch();
  const { post } = usePost();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = async () => {
    await post("/auth/logout", {});
    navigate("/login");
    dispatch(logout());
  };

  return (
    <Tooltip
      title="Logout"
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
        onClick={handleClick}
        sx={{
          "& svg": {
            transition: "stroke 0.2s ease",
          },
          "&:hover svg path, &:hover svg line, &:hover svg polyline, &:hover svg rect, &:hover svg circle":
            {
              stroke: theme.palette.accent.main,
            },
        }}
      >
        <LogOut size={16} strokeWidth={1.5} />
      </IconButton>
    </Tooltip>
  );
};
