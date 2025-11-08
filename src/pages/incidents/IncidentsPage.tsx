import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@/components/inputs";
import { BasePage, InfoBox } from "@/components/design-elements";
import { CheckTable } from "@/pages/incidents/CheckTable";
import { HeaderRange } from "@/components/common/HeaderRange";

import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import type { IMonitor } from "@/types/monitor";
import { useState, useEffect } from "react";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import type { SelectChangeEvent } from "@mui/material/Select";

const IncidentsPage = () => {
  const theme = useTheme();
  const [selectedMonitorId, setSelectedMonitorId] = useState<string>("all");
  const { id } = useParams<{ id: string }>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [range, setRange] = useState("2h");

  const { response, isValidating } = useGet<ApiResponse<any>>(
    `/checks?status=down&page=${page}&rowsPerPage=${rowsPerPage}&range=${range}${
      selectedMonitorId && selectedMonitorId !== "all"
        ? `&monitorId=${selectedMonitorId}`
        : ""
    }`,
    {},
    { keepPreviousData: true },
    { useTeamIdAsKey: true }
  );

  const { response: monitorResponse } = useGet<ApiResponse<IMonitor[]>>(
    `/monitors`,
    {},
    { keepPreviousData: true }
  );

  const monitors: IMonitor[] = monitorResponse?.data || [];

  const checks = response?.data?.checks || [];
  const count = response?.data?.count || 0;

  useEffect(() => {
    if (id) {
      setSelectedMonitorId(id);
    }
  }, [id]);

  return (
    <BasePage>
      <InfoBox
        title="Incident History"
        description="View all past and ongoing incidents across your monitors. Analyze downtime patterns, incident duration, and resolution times to improve reliability."
      />
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={theme.spacing(8)}
        justifyContent={"space-between"}
      >
        <Select<string>
          onChange={(e: SelectChangeEvent<string>) => {
            setSelectedMonitorId(e.target.value);
          }}
          value={selectedMonitorId}
        >
          <MenuItem value="all">All monitors</MenuItem>
          {monitors.map((monitor) => (
            <MenuItem key={monitor._id} value={monitor._id}>
              {monitor.name}
            </MenuItem>
          ))}
        </Select>
        <HeaderRange range={range} setRange={setRange} loading={isValidating} />
      </Stack>
      <CheckTable
        checks={checks}
        count={count}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
    </BasePage>
  );
};

export default IncidentsPage;
