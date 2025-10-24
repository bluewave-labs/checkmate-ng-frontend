import Stack from "@mui/material/Stack";
import { MonitorStatus } from "@/components/monitors/MonitorStatus";
import { ButtonGroup, Button } from "@/components/inputs";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import EmailIcon from "@mui/icons-material/Email";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import type { IMonitor } from "@/types/monitor";

export const HeaderControls = ({
  monitor,
  patch,
  isPatching,
  refetch,
  path,
}: {
  monitor: IMonitor;
  patch: Function;
  isPatching: boolean;
  refetch: Function;
  path: string;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  return (
    <Stack
      direction={isSmall ? "column" : "row"}
      spacing={isSmall ? theme.spacing(4) : 0}
      justifyContent={"space-between"}
    >
      <MonitorStatus monitor={monitor} />
      <Stack direction={"row"} spacing={theme.spacing(2)}>
        <ButtonGroup
          orientation={isSmall ? "vertical" : "horizontal"}
          fullWidth={isSmall}
          variant="contained"
          color="secondary"
        >
          <Button startIcon={<EmailIcon />}>
            {t("sendTestNotifications")}
          </Button>
          <Button startIcon={<BugReportOutlinedIcon />}>
            {t("menu.incidents")}
          </Button>
          <Button
            loading={isPatching}
            onClick={async () => {
              await patch(`/monitors/${monitor._id}/active`);
              refetch();
            }}
            startIcon={
              monitor?.isActive ? (
                <PauseOutlinedIcon />
              ) : (
                <PlayArrowOutlinedIcon />
              )
            }
          >
            {monitor?.isActive ? t("pause") : t("resume")}
          </Button>
          <Button
            startIcon={<SettingsOutlinedIcon />}
            onClick={() => {
              navigate(`${path}/${monitor._id}/configure`);
            }}
          >
            {t("configure")}
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  );
};
