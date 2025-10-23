import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import IconButton from "@mui/material/IconButton";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/AppHooks";
import { setSelectedTeamId } from "@/features/authSlice";
import { useNavigate } from "react-router";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";

export const TeamSwitch = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { response } = useGet<ApiResponse>("/teams/joined");
  const selectedTeamId = useAppSelector((state) => state.auth.selectedTeamId);
  const teams = response?.data || [];

  // If the selected team is not in the list of joined teams, reset it
  // This can happen if a user is on a team and it is deleted or they are removed from it
  if (teams.length > 0 && !teams.find((t: any) => t._id === selectedTeamId)) {
    dispatch(setSelectedTeamId(teams[0]._id));
  }

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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {teams.map((t: any) => {
          return (
            <MenuItem key={t._id} onClick={() => handleMenu(t._id)}>
              <Typography>{t.name}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
