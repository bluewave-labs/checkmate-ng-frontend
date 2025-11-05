import MuiTabs from "@mui/material/Tabs";
import type { TabsProps } from "@mui/material/Tabs";
import { useTheme } from "@mui/material/styles";
interface CustomTabsProps extends TabsProps {}

export const Tabs = (props: CustomTabsProps) => {
  const theme = useTheme();
  return (
    <MuiTabs
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: theme.palette.primary.contrastText,
        },
      }}
      {...props}
    >
      {props.children}
    </MuiTabs>
  );
};
