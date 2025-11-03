import { DateTimePicker as MuiDateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import type { DateTimePickerProps } from "@mui/x-date-pickers/DateTimePicker";

// ...existing code...
export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  function DateTimePicker(props, ref) {
    const theme = useTheme();
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MuiDateTimePicker
          {...props}
          // pass the forwarded ref through (cast to any if TS complains about exact ref type)
          ref={ref as any}
          sx={{
            "& .MuiPickersOutlinedInput-root ": {
              height: 34,
              borderRadius: theme.shape.borderRadius,
              borderColor: theme.palette.primary.lowContrast,
            },
            "& .MuiPickersOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.lowContrast,
            },
            "&:hover .MuiPickersOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.lowContrast,
            },
            "& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root.Mui-focused:not(.Mui-error) .MuiPickersOutlinedInput-notchedOutline":
              {
                borderColor: theme.palette.accent.main,
              },
          }}
        />
      </LocalizationProvider>
    );
  }
);

(DateTimePicker as any).displayName = "DateTimePicker";
// ...existing code...
