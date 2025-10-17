import {
  BasePageWithStates,
  UpStatusBox,
  DownStatusBox,
  PausedStatusBox,
} from "@/components/design-elements";
import { HeaderCreate } from "@/components/monitors";
import Stack from "@mui/material/Stack";
import { MonitorTable } from "@/pages/uptime/MonitorTable";

import { useTheme } from "@mui/material/styles";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import type { IMonitor } from "@/types/monitor";
import { useMediaQuery } from "@mui/material";

const GLOBAL_REFRESH = import.meta.env.VITE_APP_GLOBAL_REFRESH;

const UptimeMonitors = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

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
      <MonitorTable monitors={monitors} refetch={refetch} />
    </BasePageWithStates>
  );
};

export default UptimeMonitors;
