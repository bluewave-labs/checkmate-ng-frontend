import {
  BasePageWithStates,
  UpStatusBox,
  DownStatusBox,
  PausedStatusBox,
} from "@/components/design-elements";
import { HeaderCreate } from "@/components/monitors";
import Stack from "@mui/material/Stack";
import { Dialog } from "@/components/inputs";
import { MonitorTable } from "@/pages/uptime/MonitorTable";

import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import type { IMonitor } from "@/types/monitor";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDelete } from "@/hooks/UseApi";

const GLOBAL_REFRESH = import.meta.env.VITE_APP_GLOBAL_REFRESH;

const UptimeMonitors = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedMonitor, setSelectedMonitor] = useState<IMonitor | null>(null);
  const isDialogOpen = Boolean(selectedMonitor);
  const { deleteFn } = useDelete();
  const { response, loading, isValidating, error, refetch } =
    useGet<ApiResponse>(
      "/monitors?embedChecks=true",
      {},
      {
        refreshInterval: GLOBAL_REFRESH,
        keepPreviousData: true,
        dedupingInterval: 0,
      },
      {
        useTeamIdAsKey: true,
      }
    );
  const monitors: IMonitor[] = response?.data ?? ([] as IMonitor[]);

  const monitorStatuses = monitors.reduce(
    (acc, monitor) => {
      if (monitor.status === "up") {
        acc.up += 1;
      } else if (monitor.status === "down") {
        acc.down += 1;
      } else if (monitor.isActive === false) {
        acc.paused += 1;
      }
      return acc;
    },
    {
      up: 0,
      down: 0,
      paused: 0,
    }
  );

  const handleConfirm = async () => {
    await deleteFn(`/monitors/${selectedMonitor?._id}`);
    setSelectedMonitor(null);
    refetch();
  };

  const handleCancel = () => {
    setSelectedMonitor(null);
  };

  return (
    <BasePageWithStates
      loading={isValidating}
      error={error}
      items={monitors}
      page="uptime"
      actionLink="/uptime/create"
    >
      <HeaderCreate isLoading={loading} path="/uptime/create" />
      <Stack direction={isSmall ? "column" : "row"} gap={theme.spacing(8)}>
        <UpStatusBox n={monitorStatuses.up} />
        <DownStatusBox n={monitorStatuses.down} />
        <PausedStatusBox n={monitorStatuses.paused} />
      </Stack>
      <MonitorTable
        monitors={monitors}
        refetch={refetch}
        setSelectedMonitor={setSelectedMonitor}
      />
      <Dialog
        open={isDialogOpen}
        title={t("deleteDialogTitle")}
        content={t("deleteDialogDescription")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </BasePageWithStates>
  );
};

export default UptimeMonitors;
