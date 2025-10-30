import Autocomplete from "@mui/material/Autocomplete";
import type { AutocompleteProps } from "@mui/material/Autocomplete";
import { TextInput, Checkbox } from "@/components/inputs";
import ListItem from "@mui/material/ListItem";
import { useTheme } from "@mui/material/styles";

type AutoCompleteInputProps = Omit<
  AutocompleteProps<any, boolean, boolean, boolean>,
  "renderInput"
> & {
  renderInput?: AutocompleteProps<
    any,
    boolean,
    boolean,
    boolean
  >["renderInput"];
};

export const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  ...props
}) => {
  const theme = useTheme();
  const multiple = props.multiple;
  return (
    <Autocomplete
      {...props}
      disableCloseOnSelect={!!multiple}
      renderInput={(params) => (
        <TextInput {...params} placeholder="Type to search" />
      )}
      getOptionKey={(option) => option._id}
      renderTags={() => null}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <ListItem key={key} {...optionProps}>
            {multiple && <Checkbox checked={selected} />}
            {option.name}
          </ListItem>
        );
      }}
      sx={{
        "&.MuiAutocomplete-root .MuiAutocomplete-input": {
          padding: `0 ${theme.spacing(5)}`,
        },
      }}
    />
  );
};
