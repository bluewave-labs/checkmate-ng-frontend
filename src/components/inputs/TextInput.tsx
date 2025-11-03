import { forwardRef } from "react";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material";
import { typographyLevels } from "@/theme/palette";
import { useTheme } from "@mui/material/styles";

export const TextInput = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextInput(props, ref) {
    const theme = useTheme();
    return (
      <TextField
        {...props}
        inputRef={ref}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: theme.shape.borderRadius,
            height: 34,
            fontSize: typographyLevels.base,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.lowContrast,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.lowContrast,
          },
        }}
      />
    );
  }
);
TextInput.displayName = "TextInput";
