import { Outlet } from "react-router";
import Stack from "@mui/material/Stack";
import { SideBar } from "@/components/layouts/sidebar";
import { useTheme } from "@mui/material/styles";
const RootLayout = () => {
  const theme = useTheme();
  return (
    <Stack direction="row" minHeight="100vh">
      <SideBar />
      <Stack flex={1} padding={theme.spacing(12)} overflow={"hidden"}>
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default RootLayout;
