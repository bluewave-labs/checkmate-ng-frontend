import Stack from "@mui/material/Stack";
import { Button, DateTimePicker } from "@/components/inputs";
import { ConfigBox, BasePage } from "@/components/design-elements";
import { TextInput, Select, AutoComplete } from "@/components/inputs";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Trash2 } from "lucide-react";

import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { useTheme } from "@mui/material/styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { MaintenanceRepeats } from "@/types/maintenance";
import { maintenanceSchema } from "@/validation/zod";
import {
  useForm,
  Controller,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import { useEffect } from "react";
import { useInitForm } from "@/hooks/forms/UseInitMaintenanceForm";
import type { IMonitor } from "@/types/monitor";

type FormValues = z.infer<typeof maintenanceSchema>;

export const MaintenanceForm = ({
  monitorOptions,
  initialData,
  onSubmit,
  loading,
}: {
  monitorOptions: IMonitor[];
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
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(maintenanceSchema),
    defaultValues: defaults,
    mode: "onChange",
  });

  const monitors = useWatch({
    control,
    name: "monitors",
  });

  useEffect(() => {
    reset(defaults);
  }, [initialData, reset, defaults]);

  const onError = (errors: any) => {
    console.log(errors);
    console.log(getValues());
  };

  return (
    <BasePage component={"form"} onSubmit={handleSubmit(onSubmit, onError)}>
      <ConfigBox
        title={t("createMaintenanceWindowPage.generalSettingsTitle")}
        subtitle={t("createMaintenanceWindowPage.generalSettingsDescription")}
        rightContent={
          <Stack spacing={theme.spacing(8)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="text"
                  label={t("createMaintenanceWindowPage.generalSettingsName")}
                  placeholder={t(
                    "createMaintenanceWindowPage.generalSettingsNamePlaceholder"
                  )}
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />
            <Controller
              name="repeat"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="repeat-label">
                    {t("createMaintenanceWindowPage.generalSettingsRepeat")}
                  </InputLabel>
                  <Select
                    label={t(
                      "createMaintenanceWindowPage.generalSettingsRepeat"
                    )}
                    value={field.value || ""}
                    error={!!errors.repeat}
                    onChange={field.onChange}
                  >
                    {MaintenanceRepeats.map((option) => {
                      return (
                        <MenuItem key={option} value={option}>
                          <Typography textTransform={"capitalize"}>
                            {option}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        }
      />
      <ConfigBox
        title={t("createMaintenanceWindowPage.timingSettingsTitle")}
        subtitle={t("createMaintenanceWindowPage.timingSettingsDescription")}
        rightContent={
          <Stack spacing={theme.spacing(8)}>
            <Controller
              name="startTime"
              control={control}
              render={({ field }) => {
                const value = field.value ? dayjs(field.value) : null;
                return (
                  <Stack spacing={theme.spacing(4)}>
                    <Typography>Start time</Typography>
                    <DateTimePicker
                      {...field}
                      value={value}
                      onChange={(val: Dayjs | null) =>
                        field.onChange(val?.toDate())
                      }
                    />
                    <Typography color="error" variant="caption">
                      {errors?.startTime?.message}
                    </Typography>
                  </Stack>
                );
              }}
            />
            <Controller
              name="endTime"
              control={control}
              render={({ field }) => {
                const value = field.value ? dayjs(field.value) : null;
                return (
                  <Stack spacing={theme.spacing(4)}>
                    <Typography>End time</Typography>
                    <DateTimePicker
                      {...field}
                      value={value}
                      onChange={(val: Dayjs | null) =>
                        field.onChange(val?.toDate())
                      }
                    />
                    <Typography color="error" variant="caption">
                      {errors?.endTime?.message}
                    </Typography>
                  </Stack>
                );
              }}
            />
          </Stack>
        }
      />
      <ConfigBox
        title={t("createMaintenanceWindowPage.monitorsTitle")}
        subtitle={t("createMaintenanceWindowPage.monitorsDescription")}
        rightContent={
          <Stack>
            <Controller
              name="monitors"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <AutoComplete
                  multiple
                  options={monitorOptions}
                  getOptionLabel={(option) => option.name}
                  value={monitorOptions.filter((o: any) =>
                    (field.value || []).includes(o._id)
                  )}
                  onChange={(_, newValue) => {
                    field.onChange(newValue.map((o: any) => o._id));
                  }}
                />
              )}
            />
            <Stack gap={theme.spacing(2)} mt={theme.spacing(2)}>
              {monitors.map((monitorId) => {
                const option = monitorOptions.find((o) => o._id === monitorId);
                if (!option) return null;
                return (
                  <Stack
                    width={"100%"}
                    justifyContent={"space-between"}
                    direction="row"
                    key={monitorId}
                  >
                    <Typography>{option.name}</Typography>
                    <Trash2
                      size={20}
                      strokeWidth={1.5}
                      onClick={() => {
                        const updated = monitors.filter(
                          (id) => id !== monitorId
                        );
                        setValue("monitors", updated);
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Stack>
                );
              })}
            </Stack>
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
