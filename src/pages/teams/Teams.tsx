import { BasePage } from "@/components/design-elements";
import { Table } from "@/components/design-elements";
import { HeaderCreate } from "@/components/teams/HeaderCreate";

import type { Header } from "@/components/design-elements/Table";
import type { ApiResponse } from "@/hooks/UseApi";
import { useGet, useDelete } from "@/hooks/UseApi";
import type { ITeam } from "@/types/team";

const TeamsPage = () => {
  const getHeaders = () => {
    const headers: Header<ITeam>[] = [
      {
        id: "name",
        content: "Team name",
        render: (row) => {
          return row.name;
        },
      },
      {
        id: "description",
        content: "Team description",
        render: (row) => {
          return row.description;
        },
      },
    ];
    return headers;
  };

  const headers = getHeaders();

  const { response, error, loading, refetch } = useGet<ApiResponse>("/teams");
  const { deleteFn } = useDelete();
  const teams = response?.data || [];

  return (
    <BasePage>
      <HeaderCreate isLoading={loading} path="/teams/create" />
      <Table
        headers={headers}
        data={teams}
        onRowClick={async (row) => {
          await deleteFn(`/teams/${row._id}`);
          console.log(row);
          refetch();
        }}
      />
    </BasePage>
  );
};

export default TeamsPage;
