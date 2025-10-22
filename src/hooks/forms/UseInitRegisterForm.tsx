import { registerSchema } from "@/validation/zod";
import { useMemo } from "react";

import { z } from "zod";
export const useInitForm = ({
  initialData,
}: {
  initialData: Partial<z.infer<ReturnType<typeof registerSchema>>> | undefined;
}) => {
  return useMemo(() => {
    const defaults: z.infer<ReturnType<typeof registerSchema>> = {
      email: initialData?.email || "",
      password: initialData?.password || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      confirmPassword: initialData?.confirmPassword || "",
    };
    return { defaults };
  }, [initialData]);
};
