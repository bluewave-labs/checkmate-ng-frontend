import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@/components/inputs";
import { BasePage, InfoBox } from "@/components/design-elements";
import { IncidentTable } from "@/pages/incidents/IncidentTable";
import { HeaderRange } from "@/components/common/HeaderRange";

import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { IIncident } from "@/types/incident";
import type { IMonitor } from "@/types/monitor";

const IncidentsPage = () => {
  const theme = useTheme();
  const [selectedMonitorId, setSelectedMonitorId] = useState<string>("all");
  const { id } = useParams<{ id: string }>();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [range, setRange] = useState("2h");

  const { response, isValidating } = useGet<
    ApiResponse<{ count: number; incidents: IIncident[] }>
  >(
    `/incidents?page=${page}&rowsPerPage=${rowsPerPage}&range=${range}`,
    {},
    { keepPreviousData: true },
    { useTeamIdAsKey: true }
  );

  const incidents = response?.data?.incidents || [];
  const count = response?.data?.count || 0;

  const { response: monitorResponse } = useGet<ApiResponse<IMonitor[]>>(
    `/monitors`,
    {},
    { keepPreviousData: true }
  );

  const monitors: IMonitor[] = monitorResponse?.data || [];

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
          {incidents.map((incident) => (
            <MenuItem key={incident._id} value={incident._id}>
              {incident._id}
            </MenuItem>
          ))}
        </Select>
        <HeaderRange range={range} setRange={setRange} loading={isValidating} />
      </Stack>
      <IncidentTable
        incidents={incidents.reverse()}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        page={page}
        setPage={setPage}
        count={count}
      />
    </BasePage>
  );
};

export default IncidentsPage;
