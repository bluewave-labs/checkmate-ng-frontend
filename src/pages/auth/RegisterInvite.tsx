import { AuthBasePage } from "@/components/auth";
import Stack from "@mui/material/Stack";
import { RegisterForm } from "./RegisterForm";

import {
  setAuthenticated,
  setUser,
  setSelectedTeamId,
} from "@/features/authSlice";
import { useAppDispatch } from "@/hooks/AppHooks";
import type { ApiResponse } from "@/hooks/UseApi";
import { useTranslation } from "react-i18next";
import { usePost } from "@/hooks/UseApi";
import { useNavigate } from "react-router";
import { z } from "zod";
import { registerSchema } from "@/validation/zod";
import { useGet } from "@/hooks/UseApi";
import { useParams } from "react-router";

type FormData = z.infer<typeof registerSchema>;
const RegisterInvite = () => {
  const { id: token } = useParams();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { post, loading, error } = usePost<FormData, ApiResponse>();
  const { response, error: errorInvite } = useGet<ApiResponse>(
    `/invite/${token}`
  );
  const { user, invite } = response?.data || {};
  const hasUser = Boolean(user);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    const submit = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    const result = await post(`/auth/register/invite/${token}`, submit);

    if (!result) {
      dispatch(setAuthenticated(false));
      navigate("/login");
    }

    const user = result?.data;

    if (!user) {
      dispatch(setAuthenticated(false));
      navigate("/login");
      return;
    }

    dispatch(setAuthenticated(true));
    dispatch(setUser(user));
    dispatch(setSelectedTeamId(user.teams[0]?.id || null));
    navigate("/");
  };

  if (errorInvite) {
    return "No invite found";
  }

  return (
    <AuthBasePage
      title={t("auth.registration.welcome")}
      subtitle={t("auth.registration.heading.user")}
    >
      <Stack alignItems={"center"} width={"100%"}>
        <RegisterForm
          mode="invite"
          hasUser={hasUser}
          initialData={{
            email: invite?.email || "",
          }}
          onSubmit={onSubmit}
          loading={loading}
          error={error}
        />
      </Stack>
    </AuthBasePage>
  );
};

export default RegisterInvite;
