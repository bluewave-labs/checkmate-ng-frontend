import { Table, Pagination, StatusLabel } from "@/components/design-elements";
import Box from "@mui/material/Box";

import type { Header } from "@/components/design-elements/Table";

import { useTranslation } from "react-i18next";
import { formatDateWithTz } from "@/utils/TimeUtils";
import { useAppSelector } from "@/hooks/AppHooks";
import type { IIncident } from "@/types/incident";

const getHeaders = (t: Function, uiTimezone: string) => {
  const headers: Header<IIncident>[] = [
    {
      id: "name",
      content: t("incidentsTableMonitorName"),
      render: (row) => {
        return row.monitorId.name || "N/A";
      },
    },
    {
      id: "start",
      content: "Incident start",
      render: (row) => {
        return formatDateWithTz(
          row.startedAt,
          "ddd, MMMM D, YYYY, HH:mm A",
          uiTimezone
        );
      },
    },
    {
      id: "end",
      content: "Incident end",
      render: (row) => {
        return row.endedAt || "Ongoing";
      },
    },
    {
      id: "status",
      content: "Current monitor status",
      render: (row) => {
        return <StatusLabel status={row.monitorId.status} />;
      },
    },
    {
      id: "resolved",
      content: "Resolved",
      render: (row) => {
        return row.resolved ? "Yes" : "No";
      },
    },
    {
      id: "resolutionType",
      content: "Resolution type",
      render: (row) => {
        return row.resolutionType || "N/A";
      },
    },
    {
      id: "resolvedBy",
      content: "Resolved by",
      render: (row) => {
        return row.resolvedBy?.email || "N/A";
      },
    },
  ];
  return headers;
};

export const IncidentTable = ({
  incidents,
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  incidents: IIncident[];
  count: number;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rowsPerPage: number) => void;
}) => {
  const { t } = useTranslation();
  const uiTimezone = useAppSelector((state: any) => state.ui.timezone);
  const headers = getHeaders(t, uiTimezone);

  const handlePageChange = (
    _e: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    setPage(0);
    setRowsPerPage(value);
  };

  return (
    <Box>
      <Table headers={headers} data={incidents} />
      <Pagination
        component="div"
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};
