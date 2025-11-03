import { MaintenanceForm } from "@/pages/maintenance/MaintenanceForm";

import { useNavigate } from "react-router";
import { z } from "zod";
import { usePost } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import { maintenanceSchema } from "@/validation/zod";

type FormValues = z.infer<typeof maintenanceSchema>;

const MaintenanceCreatePage = () => {
  const { post, loading } = usePost<FormValues, ApiResponse>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const res = await post("/maintenance", data);
    if (res) {
      navigate(-1);
    }
  };
  return <MaintenanceForm onSubmit={onSubmit} loading={loading} />;
};

export default MaintenanceCreatePage;
