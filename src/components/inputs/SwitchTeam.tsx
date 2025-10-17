import Stack from "@mui/material/Stack";
import { Select } from "@/components/inputs";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/AppHooks";
import { setSelectedTeamId } from "@/features/authSlice";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";

export const TeamSwitch = () => {
  // const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  // const selectedTeamId = useAppSelector((state) => state.auth.selectedTeamId);
  const teams = useAppSelector((state) => state.auth.user?.teams || []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const handleSelectChange = (e: any) => {
  //   const selectedTeamId = e.target.value;
  //   dispatch(setSelectedTeamId(selectedTeamId));
  //   navigate("/");
  // };

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
        {teams.map((t) => {
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

  // return (
  //   <>
  //     <Select
  //       value={selectedTeamId}
  //       renderValue={() => {
  //         return <Groups2OutlinedIcon />;
  //       }}
  //       size="small"
  //       autoWidth
  //       onChange={handleSelectChange}
  //       displayEmpty
  //     >
  //       {teams.map((t) => {
  //         return (
  //           <MenuItem key={t._id} value={t._id}>
  //             <Stack direction="row" gap={theme.spacing(4)}>
  //               <Typography textTransform={"uppercase"}>{t.name}</Typography>
  //             </Stack>
  //           </MenuItem>
  //         );
  //       })}
  //     </Select>
  //   </>
  // );
};
