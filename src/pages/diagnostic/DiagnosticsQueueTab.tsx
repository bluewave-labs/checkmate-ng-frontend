import Stack from "@mui/material/Stack";
import { StatBox } from "@/components/design-elements";
import { Table } from "@/components/design-elements";

import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import type { IJob, IJobMetrics } from "@/types/job";
import type { Header } from "@/components/design-elements/Table";

export const DiagnosticsQueueTab = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { response } = useGet<
    ApiResponse<{ jobs: IJob[]; metrics: IJobMetrics }>
  >(`/diagnostic/jobs`, {}, { refreshInterval: 5000 });

  const jobs: IJob[] = response?.data?.jobs || [];
  const metrics = response?.data?.metrics;

  if (!metrics) {
    return null;
  }

  const getHeaders = () => {
    const headers: Header<IJob>[] = [
      {
        id: "name",
        content: t("diagnosticsPage.tableHeaderId"),
        render: (row) => {
          return row.id;
        },
      },
      {
        id: "url",
        content: t("diagnosticsPage.tableHeaderUrl"),
        render: (row) => {
          return row?.data?.url || "-";
        },
      },
      {
        id: "interval",
        content: t("diagnosticsPage.tableHeaderInterval"),
        render: (row) => {
          return row?.data?.interval || "-";
        },
      },
      {
        id: "type",
        content: t("diagnosticsPage.tableHeaderType"),
        render: (row) => {
          return row?.data?.type || "-";
        },
      },
      {
        id: "active",
        content: t("diagnosticsPage.tableHeaderActive"),
        render: (row) => {
          return row?.data?.isActive;
        },
      },

      {
        id: "runCount",
        content: t("diagnosticsPage.tableHeaderRunCount"),
        render: (row) => {
          return row?.runCount || "-";
        },
      },
      {
        id: "lastRun",
        content: t("diagnosticsPage.tableHeaderLastRun"),
        render: (row) => {
          return row?.lastRunAt || "-";
        },
      },
      {
        id: "lockedAt",
        content: t("diagnosticsPage.tableHeaderLockedAt"),
        render: (row) => {
          return row?.lockedAt || "-";
        },
      },
      {
        id: "lastFinishedAt",
        content: t("diagnosticsPage.tableHeaderLastFinishedAt"),
        render: (row) => {
          return row?.lastFinishedAt || "-";
        },
      },
      {
        id: "lastRunTook",
        content: t("diagnosticsPage.tableHeaderLastRunTook"),
        render: (row) => {
          return row?.lastRunTook || "-";
        },
      },
    ];
    return headers;
  };

  const headers = getHeaders();

  return (
    <Stack spacing={theme.spacing(8)}>
      <Stack direction={{ s: "column", md: "row" }} gap={theme.spacing(8)}>
        <StatBox
          title={t("diagnosticsPage.statBoxJobsTitle")}
          subtitle={`${metrics?.jobs}`}
          sx={{ width: "100%" }}
        />
        <StatBox
          title={t("diagnosticsPage.statBoxActiveJobsTitle")}
          subtitle={`${metrics.activeJobs}`}
          sx={{ width: "100%" }}
        />
        <StatBox
          title={t("diagnosticsPage.statBoxFailingJobsTitle")}
          subtitle={`${metrics.failingJobs}`}
          sx={{ width: "100%" }}
        />
        <StatBox
          title={t("diagnosticsPage.statBoxTotalRunsTitle")}
          subtitle={`${metrics.totalRuns}`}
          sx={{ width: "100%" }}
        />
        <StatBox
          title={t("diagnosticsPage.statBoxTotalFailuresTitle")}
          subtitle={`${metrics.totalFailures}`}
          sx={{ width: "100%" }}
        />
      </Stack>
      <Table headers={headers} data={jobs} />
    </Stack>
  );
};
