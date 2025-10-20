import { BasePage } from "@/components/design-elements";
import { Table } from "@/components/design-elements";
import { HeaderCreate } from "@/components/teams/HeaderCreate";
import { ActionsMenu } from "@/components/actions-menu";
import { Dialog } from "@/components/inputs";

import { useTranslation } from "react-i18next";
import type { ActionMenuItem } from "@/components/actions-menu";
import type { Header } from "@/components/design-elements/Table";
import type { ApiResponse } from "@/hooks/UseApi";
import { useGet, useDelete } from "@/hooks/UseApi";
import type { ITeam } from "@/types/team";
import { useState, useEffect } from "react";

const TeamsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null);
  const isDialogOpen = Boolean(selectedTeam);
  const { t } = useTranslation();
  const { response, error, loading, refetch } = useGet<ApiResponse>("/teams");
  const { deleteFn } = useDelete();
  const teams = response?.data || [];

  const handleConfirm = async () => {
    await deleteFn(`/teams/${selectedTeam?._id}`);
    setSelectedTeam(null);
    refetch();
  };
  const handleCancel = () => {
    setSelectedTeam(null);
  };

  const getActions = (team: ITeam): ActionMenuItem[] => {
    return [
      {
        id: 1,
        label: "Delete",
        action: () => {
          setSelectedTeam(team);
        },
        closeMenu: true,
      },
    ];
  };

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
      {
        id: "description",
        content: "Team description",
        render: (row) => {
          return <ActionsMenu items={getActions(row)} />;
        },
      },
    ];
    return headers;
  };

  const headers = getHeaders();

  return (
    <BasePage>
      <HeaderCreate isLoading={loading} path="/teams/create" />
      <Table headers={headers} data={teams} />
      <Dialog
        open={isDialogOpen}
        title={t("deleteDialogTitle")}
        content={t("deleteDialogDescription")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </BasePage>
  );
};

export default TeamsPage;
