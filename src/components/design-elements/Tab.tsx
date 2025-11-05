import MuiTab from "@mui/material/Tab";
import type { TabProps } from "@mui/material/Tab";
import { useTheme } from "@mui/material/styles";
interface CustomTabProps extends TabProps {}

export const Tab = (props: CustomTabProps) => {
  const theme = useTheme();
  return (
    <MuiTab
      disableRipple
      sx={{
        "&.Mui-selected": {
          color: theme.palette.primary.contrastText,
        },
      }}
      {...props}
    />
  );
};
