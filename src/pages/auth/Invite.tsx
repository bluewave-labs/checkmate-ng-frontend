import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { Button, TextInput, Select } from "@/components/inputs";
import { BasePage } from "@/components/design-elements";

import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { inviteSchema } from "@/validation/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";

type FormValues = z.infer<typeof inviteSchema>;

const Invite = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const { response } = useGet<ApiResponse>("/roles?type=team");
  const roles = response?.data || [];

  const { response: teamsResponse } = useGet<ApiResponse>("/teams");
  const teams = teamsResponse?.data || [];

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      teamId: "",
      teamRoleId: "",
    },
  });

  useEffect(() => {
    reset({
      teamId: teams[0]?._id || "",
      teamRoleId: roles[0]?._id || "",
    });
  }, [teams, roles, reset]);

  return (
    <BasePage component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={theme.spacing(8)} maxWidth={400}>
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
          name="teamId"
          control={control}
          render={({ field }) => {
            return (
              <Stack gap={theme.spacing(8)}>
                <Select
                  value={field.value}
                  error={!!errors.teamId}
                  onChange={field.onChange}
                >
                  {teams.map((team: any) => {
                    return (
                      <MenuItem key={team._id} value={team._id}>
                        {team.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
            );
          }}
        />
        <Controller
          name="teamRoleId"
          control={control}
          render={({ field }) => {
            return (
              <Stack gap={theme.spacing(8)}>
                <Select
                  value={field.value}
                  error={!!errors.teamRoleId}
                  onChange={field.onChange}
                >
                  {roles.map((role: any) => {
                    return (
                      <MenuItem key={role._id} value={role._id}>
                        {role.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Stack>
            );
          }}
        />
        <Box flex={1}>
          <Button variant="contained" color="accent" type="submit">
            Send Invite
          </Button>
        </Box>
      </Stack>
    </BasePage>
  );
};

export default Invite;
