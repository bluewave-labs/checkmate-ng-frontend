import { TeamsForm } from "@/pages/teams/TeamsForm";

import { z } from "zod";
import { teamSchema } from "@/validation/zod";
import { usePost } from "@/hooks/UseApi";

const TeamsCreatePage = () => {
  type FormValues = z.infer<typeof teamSchema>;
  const { post, loading, error } = usePost<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };

  return <TeamsForm onSubmit={onSubmit} loading={loading} />;
};

export default TeamsCreatePage;
