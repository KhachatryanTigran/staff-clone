import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox({
  optionsData,
  setValue,
  disabled,
  defaultValue,
  selectedValue,
}) {
  const options = optionsData.map((option) => {
    return { label: option };
  });

  return (
    <Autocomplete
      disabled={disabled}
      onChange={(event, value) => {
        setValue(value?.label);
      }}
      defaultValue={defaultValue && { label: defaultValue }}
      size="small"
      options={options}
      getOptionLabel={(option) => option?.label}
      filterOptions={(options, { inputValue }) =>
        options.filter(
          (option) =>
            option?.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        )
      }
      getOptionDisabled={(option) => {
        if (
          selectedValue?.some(
            (item) =>
              item.value === option?.label && item.value !== defaultValue
          )
        ) {
          return true;
        }

        return false;
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField color="customGreen" {...params} />}
    />
  );
}
