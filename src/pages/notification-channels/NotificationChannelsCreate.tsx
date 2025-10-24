import { NotificationChannelsForm } from "./NotificationChannelsForm";

import { useNavigate } from "react-router";
import { z } from "zod";
import { usePost } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import { notificationChannelSchema } from "@/validation/zod";

type FormValues = z.infer<typeof notificationChannelSchema>;

const NotificationsChannelCreatePage = () => {
  const { post, loading } = usePost<FormValues, ApiResponse>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const res = await post("/notification-channels", data);
    if (res) {
      navigate(-1);
    }
  };
  return <NotificationChannelsForm onSubmit={onSubmit} loading={loading} />;
};

export default NotificationsChannelCreatePage;
