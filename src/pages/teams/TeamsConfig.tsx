import { TeamsForm } from "@/pages/teams/TeamsForm";

import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { teamSchema } from "@/validation/zod";
import { useGet, usePatch } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";

const TeamsConfigPage = () => {
  type FormValues = z.infer<typeof teamSchema>;
  const navigate = useNavigate();
  const { response } = useGet<ApiResponse>("/roles?type=team");
  const { patch, loading, error } = usePatch<FormValues, ApiResponse>();

  const { id } = useParams();
  const { response: teamResponse } = useGet<ApiResponse>(`/teams/${id}`);
  const team = teamResponse?.data || null;

  const onSubmit = async (data: FormValues) => {
    const toSubmit = {
      name: data.name,
      description: data.description,
    };
  };

  return (
    <TeamsForm
      mode="config"
      initialData={{ ...team, roleId: "" }}
      onSubmit={onSubmit}
      loading={loading}
      roles={response?.data || []}
    />
  );
};

export default TeamsConfigPage;
