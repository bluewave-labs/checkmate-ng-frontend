import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";

import { useAppSelector } from "@/hooks/AppHooks";
import { useState } from "react";

export const SettingsSwitch = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const user = useAppSelector((state) => state.auth.user);

  const orgPermissions = user?.org?.permissions || [];
  const hasOrgLevelTeamEdit =
    orgPermissions.includes("teams.*") ||
    orgPermissions.includes("teams.write") ||
    orgPermissions.includes("*");

  const hasTeamLevelTeamEdit = user?.teams.some((team) => {
    const hasAllTeamPermissions = team?.permissions?.includes("teams.*");
    const hasTeamEditPermission = team?.permissions?.includes("teams.write");
    return hasAllTeamPermissions || hasTeamEditPermission;
  });

  const hasTeamEdit = hasOrgLevelTeamEdit || hasTeamLevelTeamEdit;

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SettingsOutlinedIcon />
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
        <MenuItem>
          <Typography>General settings</Typography>
        </MenuItem>
        {hasTeamEdit && (
          <MenuItem>
            <Typography>Teams</Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
