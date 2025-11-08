import ButtonGroup from "@mui/material/ButtonGroup";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import { useTheme } from "@mui/material/styles";

export const ButtonGroupInput: React.FC<ButtonGroupProps> = ({
  orientation,
  ...props
}) => {
  const theme = useTheme();
  return (
    <ButtonGroup
      orientation={orientation}
      {...props}
      sx={{
        height: orientation === "horizontal" ? 34 : "auto",
        boxShadow: "none",
        gap: theme.spacing(2),
        border: 1,
        borderStyle: "solid",
        borderColor: theme.palette.primary.lowContrast,
        borderRadius: theme.shape.borderRadius,
        "& .MuiButton-root": {
          border: "none",
        },
      }}
    />
  );
};
