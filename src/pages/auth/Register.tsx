import { AuthBasePage } from "@/components/auth";
import { TextInput } from "@/components/inputs";
import { Button } from "@/components/inputs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
  setAuthenticated,
  setUser,
  setSelectedTeamId,
} from "@/features/authSlice";
import { useAppDispatch } from "@/hooks/AppHooks";
import type { ApiResponse } from "@/hooks/UseApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import { usePost } from "@/hooks/UseApi";
import { useNavigate } from "react-router";

const schema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

type FormData = z.infer<typeof schema>;

const Register = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { post, loading, error } = usePost<FormData, ApiResponse>();

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const result = await post("/auth/register", data);

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
    dispatch(setSelectedTeamId(user.teamIds?.[0] || null));
    navigate("/");
  };

  return (
    <AuthBasePage
      title={t("auth.registration.welcome")}
      subtitle={t("auth.registration.heading.user")}
    >
      <Stack alignItems={"center"} width={"100%"}>
        <Stack
          component="form"
          padding={theme.spacing(8)}
          gap={theme.spacing(12)}
          onSubmit={handleSubmit(onSubmit)}
          maxWidth={400}
          sx={{
            width: {
              sm: "80%",
              md: "70%",
              lg: "65%",
              xl: "65%",
            },
          }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                label={t("auth.common.inputs.email.label")}
                fullWidth
                placeholder={t("auth.common.inputs.email.placeholder")}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                label={t("auth.common.inputs.firstName.label")}
                fullWidth
                placeholder={t("auth.common.inputs.firstName.placeholder")}
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                label={t("auth.common.inputs.lastName.label")}
                fullWidth
                placeholder={t("auth.common.inputs.lastName.placeholder")}
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                type="password"
                label={t("auth.common.inputs.password.label")}
                fullWidth
                placeholder="••••••••••"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextInput
                {...field}
                type="password"
                label={t("auth.common.inputs.passwordConfirm.label")}
                fullWidth
                placeholder={t(
                  "auth.common.inputs.passwordConfirm.placeholder"
                )}
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
              />
            )}
          />
          <Button
            variant="contained"
            loading={loading}
            color="accent"
            type="submit"
            sx={{ width: "100%", alignSelf: "center", fontWeight: 700 }}
          >
            Register
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Stack>
      </Stack>
    </AuthBasePage>
  );
};

export default Register;
