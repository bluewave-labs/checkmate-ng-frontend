import Stack from "@mui/material/Stack";
import { Button } from "@/components/inputs";
import { ConfigBox, BasePage } from "@/components/design-elements";
import { TextInput } from "@/components/inputs";

import { useTheme } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { teamSchema } from "@/validation/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useInitForm } from "@/hooks/forms/UseInitTeamsForm";

type FormValues = z.infer<typeof teamSchema>;

export const TeamsForm = ({
  initialData,
  onSubmit,
  loading,
}: {
  initialData?: Partial<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { defaults } = useInitForm({ initialData: initialData });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(teamSchema) as any,
    defaultValues: defaults,
    mode: "onChange",
  });

  useEffect(() => {
    reset(defaults);
  }, [initialData, reset, defaults]);

  return (
    <BasePage component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <ConfigBox
        title={t("createTeamsPage.basicInfoTitle")}
        subtitle={t("createTeamsPage.basicInfoSubtitle")}
        rightContent={
          <Stack gap={theme.spacing(8)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="text"
                  label={t("createTeamsPage.basicInfoName")}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="text"
                  label={t("createTeamsPage.basicInfoDescription")}
                  fullWidth
                  error={!!errors.description}
                  helperText={
                    errors.description ? errors.description.message : ""
                  }
                />
              )}
            />
          </Stack>
        }
      />
      <Stack direction="row" justifyContent="flex-end">
        <Button
          loading={loading}
          type="submit"
          variant="contained"
          color="accent"
        >
          {t("settingsSave")}
        </Button>
      </Stack>
    </BasePage>
  );
};
