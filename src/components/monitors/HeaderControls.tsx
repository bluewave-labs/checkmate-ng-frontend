import Stack from "@mui/material/Stack";
import { MonitorStatus } from "@/components/monitors/MonitorStatus";
import { Button } from "@/components/inputs";
import { Settings, Pause, Play, Mail, Bug } from "lucide-react";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import type { IMonitor } from "@/types/monitor";
import { usePost } from "@/hooks/UseApi";

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
  const { post, loading: isPosting } = usePost<any, any>();
  const hasNotificationChannels = monitor?.notificationChannels.length > 0;
  return (
    <Stack
      direction={isSmall ? "column" : "row"}
      spacing={isSmall ? theme.spacing(4) : 0}
      justifyContent={"space-between"}
    >
      <MonitorStatus monitor={monitor} />
      <Stack direction={"row"} spacing={theme.spacing(4)}>
        {hasNotificationChannels && (
          <Button
            variant="contained"
            color="primary"
            loading={isPosting || isPatching}
            startIcon={<Mail size={20} strokeWidth={1.5} />}
            onClick={async () => {
              await post(`/monitors/${monitor._id}/notifications/test`, {});
            }}
          >
            {t("sendTestNotifications")}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Bug size={20} strokeWidth={1.5} />}
          onClick={() => {
            navigate(`/incidents/${monitor._id}`);
          }}
        >
          {t("menu.incidents")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          loading={isPatching || isPosting}
          onClick={async () => {
            await patch(`/monitors/${monitor._id}/active`);
            refetch();
          }}
          startIcon={
            monitor?.isActive ? (
              <Pause size={20} strokeWidth={1.5} />
            ) : (
              <Play size={20} strokeWidth={1.5} />
            )
          }
        >
          {monitor?.isActive ? t("pause") : t("resume")}
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Settings size={20} strokeWidth={1.5} />}
          onClick={() => {
            navigate(`${path}/${monitor._id}/configure`);
          }}
        >
          {t("configure")}
        </Button>
      </Stack>
    </Stack>
  );
};
