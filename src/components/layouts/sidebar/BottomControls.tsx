import { Select } from "@/components/inputs";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "@/hooks/AppHooks";
import { setSelectedTeamId } from "@/features/authSlice";
import useMediaQuery from "@mui/material/useMediaQuery";

export const BottomControls = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const selectedTeamId = useAppSelector((state) => state.auth.selectedTeamId);
  const teams = useAppSelector((state) => state.auth.user?.teams || []);

  const handleChange = (e: any) => {
    const selectedTeamId = e.target.value;
    dispatch(setSelectedTeamId(selectedTeamId));
    navigate("/");
  };

  return (
    <Stack
      direction="row"
      height={50}
      py={theme.spacing(4)}
      px={theme.spacing(8)}
      gap={theme.spacing(2)}
    >
      <Select
        value={selectedTeamId}
        size="small"
        autoWidth
        onChange={handleChange}
      >
        {teams.map((t) => {
          return (
            <MenuItem key={t._id} value={t._id}>
              <Stack direction="row" gap={theme.spacing(4)}>
                <Typography textTransform={"uppercase"}>{t.name}</Typography>
              </Stack>
            </MenuItem>
          );
        })}
      </Select>
    </Stack>
  );
};
