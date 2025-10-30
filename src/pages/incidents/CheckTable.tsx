import { Table, Pagination, StatusLabel } from "@/components/design-elements";
import Box from "@mui/material/Box";

import type { Header } from "@/components/design-elements/Table";
import type { CheckWithMonitor } from "@/types/check";
import type { MonitorStatus } from "@/types/monitor";

import { useTranslation } from "react-i18next";
import { formatDateWithTz } from "@/utils/TimeUtils";
import { useAppSelector } from "@/hooks/AppHooks";

const getHeaders = (t: Function, uiTimezone: string) => {
  const headers: Header<CheckWithMonitor>[] = [
    {
      id: "name",
      content: t("name"),
      render: (row) => {
        return row.metadata.monitorId.name || "N/A";
      },
    },
    {
      id: "status",
      content: t("status"),
      render: (row) => {
        return <StatusLabel status={row.status as MonitorStatus} />;
      },
    },
    {
      id: "date",
      content: t("date&Time"),
      render: (row) => {
        return formatDateWithTz(
          row.createdAt,
          "ddd, MMMM D, YYYY, HH:mm A",
          uiTimezone
        );
      },
    },
    {
      id: "statusCode",
      content: t("statusCode"),
      render: (row) => {
        return row.httpStatusCode || "N/A";
      },
    },
  ];
  return headers;
};

export const CheckTable = ({
  checks,
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}: {
  checks: CheckWithMonitor[];
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
      <Table headers={headers} data={checks} />
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
