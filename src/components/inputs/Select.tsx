import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import type { SelectProps } from "@mui/material/Select";

export const SelectInput = <T,>(props: SelectProps<T>) => {
  const theme = useTheme();

  return (
    <Select<T>
      {...props}
      sx={{
        height: "34px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: theme.shape.borderRadius,
          borderColor: theme.palette.primary.lowContrast,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.lowContrast,
        },
        ...props.sx,
      }}
    />
  );
};
