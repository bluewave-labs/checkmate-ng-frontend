import { monitorSchema } from "@/validation/zod";
import { useGet, usePatch } from "@/hooks/UseApi";
import { UptimeForm } from "@/pages/uptime/UptimeForm";

import { useParams } from "react-router";
import type { ApiResponse } from "@/hooks/UseApi";
import humanInterval from "human-interval";
import { z } from "zod";
import { useNavigate } from "react-router";

const UptimeConfigurePage = () => {
  type FormValues = z.infer<typeof monitorSchema>;
  type SubmitValues = Omit<FormValues, "interval"> & {
    interval: number | undefined;
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const { response } = useGet<ApiResponse>("/notification-channels");
  const { response: monitorResponse } = useGet<ApiResponse>(`/monitors/${id}`);
  const monitor = monitorResponse?.data || null;
  const notificationOptions = response?.data ?? [];

  const { patch, loading, error } = usePatch<SubmitValues, ApiResponse>();

  const onSubmit = async (data: FormValues) => {
    let interval = humanInterval(data.interval);
    if (!interval) interval = 60000;
    const submitData = { ...data, interval };
    const result = await patch(`/monitors/${id}`, submitData);
    if (result) {
      navigate(`/uptime/${id}`);
    } else {
      console.error(error);
    }
  };
  return (
    <UptimeForm
      initialData={{
        ...monitor,
      }}
      onSubmit={onSubmit}
      notificationOptions={notificationOptions}
      loading={loading}
    />
  );
};

export default UptimeConfigurePage;
