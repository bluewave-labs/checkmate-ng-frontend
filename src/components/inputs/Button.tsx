import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export const ButtonInput = ({ sx, ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      sx={{
        textTransform: "none",
        height: 34,
        fontWeight: 400,
        borderRadius: 2,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        ...sx,
      }}
    />
  );
};
