import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/material/IconButton";
import { useAppDispatch } from "@/hooks/AppHooks";
import { logout } from "@/features/authSlice";
import { usePost } from "@/hooks/UseApi";
import { useNavigate } from "react-router";

export const LogoutSwitch = () => {
  const dispatch = useAppDispatch();
  const { post } = usePost();
  const navigate = useNavigate();

  const handleClick = async () => {
    await post("/auth/logout", {});
    navigate("/login");
    dispatch(logout());
  };

  return (
    <IconButton onClick={handleClick}>
      <LogoutOutlinedIcon />
    </IconButton>
  );
};
