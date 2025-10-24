import Stack from "@mui/material/Stack";
import { Button } from "@/components/inputs";
import { ConfigBox, BasePage } from "@/components/design-elements";
import { TextInput, Select } from "@/components/inputs";
import MenuItem from "@mui/material/MenuItem";

import { ChannelTypes } from "@/types/notification-channel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { notificationChannelSchema } from "@/validation/zod";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { useInitForm } from "@/hooks/forms/UseInitNotificationsChannelForm";

type FormValues = z.infer<typeof notificationChannelSchema>;

export const NotificationChannelsForm = ({
  initialData,
  onSubmit,
  loading,
}: {
  mode?: string;
  initialData?: Partial<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  loading: boolean;
}) => {
  const { t } = useTranslation();
  const { defaults } = useInitForm({ initialData: initialData });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(notificationChannelSchema),
    defaultValues: defaults,
    mode: "onChange",
  });

  useEffect(() => {
    reset(defaults);
  }, [initialData, reset, defaults]);

  const type = watch("type");

  const onError = (errors: any) => {
    console.log(errors);
    console.log(getValues());
  };

  return (
    <BasePage component={"form"} onSubmit={handleSubmit(onSubmit, onError)}>
      <ConfigBox
        title={t("createNotifications.nameSettings.title")}
        subtitle={t("createNotifications.nameSettings.description")}
        rightContent={
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                type="text"
                label={t("createNotifications.nameSettings.nameLabel")}
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />
        }
      />
      <ConfigBox
        title={t("createNotifications.typeSettings.title")}
        subtitle={t("createNotifications.typeSettings.description")}
        rightContent={
          <Controller
            name="type"
            control={control}
            defaultValue={defaults.type}
            render={({ field }) => {
              return (
                <Select
                  value={field.value}
                  error={!!errors.type}
                  onChange={field.onChange}
                >
                  {ChannelTypes.map((type: string) => {
                    return (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    );
                  })}
                </Select>
              );
            }}
          />
        }
      />
      <ConfigBox
        title={"Config"}
        subtitle={"Configure notification channel settings"}
        rightContent={
          type === "email" ? (
            <Controller
              name="config.emailAddress"
              control={control}
              defaultValue={defaults.config.emailAddress}
              render={({ field }) => {
                return (
                  <TextInput
                    {...field}
                    type="text"
                    label={t("createNotifications.emailSettings.description")}
                    fullWidth
                    error={!!errors.config?.emailAddress}
                    helperText={
                      errors.config?.emailAddress
                        ? errors.config.emailAddress.message
                        : ""
                    }
                  />
                );
              }}
            />
          ) : (
            <Controller
              name="config.url"
              control={control}
              defaultValue={defaults.config.url}
              render={({ field }) => {
                return (
                  <TextInput
                    {...field}
                    type="text"
                    label={"URL"}
                    fullWidth
                    error={!!errors.config?.url}
                    helperText={
                      errors.config?.url ? errors.config.url.message : ""
                    }
                  />
                );
              }}
            />
          )
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
