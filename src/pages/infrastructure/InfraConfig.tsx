import { monitorSchemaInfra } from "@/validation/zod";
import { useGet, usePatch } from "@/hooks/UseApi";
import { InfraForm } from "@/pages/infrastructure/InfraForm";

import { useParams } from "react-router";
import type { ApiResponse } from "@/hooks/UseApi";
import humanInterval from "human-interval";
import { z } from "zod";
import { useNavigate } from "react-router";

const InfraConfigurePage = () => {
  type FormValues = z.infer<typeof monitorSchemaInfra>;
  type SubmitValues = Omit<FormValues, "interval"> & {
    interval: number | undefined;
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const { response } = useGet<ApiResponse>("/notification-channels");
  const { response: monitorResponse } = useGet<ApiResponse>(`/monitors/${id}`);
  const monitor = monitorResponse?.data || null;
  const notificationOptions = response?.data ?? [];

  const { patch, loading, error } = usePatch<
    Partial<SubmitValues>,
    ApiResponse
  >();

  const onSubmit = async (data: FormValues) => {
    let interval = humanInterval(data.interval);
    if (!interval) interval = 180000;
    const submitData = {
      type: data.type,
      secret: data.secret,
      name: data.name,
      notificationChannels: data.notificationChannels,
      interval,
    };
    const result = await patch(`/monitors/${id}`, submitData);
    if (result) {
      navigate(`/infrastructure/${id}`);
    } else {
      console.error(error);
    }
  };
  return (
    <InfraForm
      mode="configure"
      initialData={{
        ...monitor,
      }}
      onSubmit={onSubmit}
      notificationOptions={notificationOptions}
      loading={loading}
    />
  );
};

export default InfraConfigurePage;
