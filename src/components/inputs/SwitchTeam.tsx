import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/AppHooks";
import { setSelectedTeamId } from "@/features/authSlice";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";

export const TeamSwitch = () => {
  const { response, error, refetch } = useGet<ApiResponse>("/teams");
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (teamId: string) => {
    dispatch(setSelectedTeamId(teamId));
    navigate("/");
    handleClose();
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Groups2OutlinedIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {response?.data.map((t: any) => {
          return (
            <MenuItem
              key={t._id}
              value={t._id}
              onClick={() => handleMenu(t._id)}
            >
              <Stack direction="row" gap={theme.spacing(4)}>
                <Typography textTransform={"uppercase"}>{t.name}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
