import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function SearchTextField({ onChange, value }) {
  return (
    <Box
      size="small"
      required={true}
      component="form"
      sx={{
        width: "calc(100 % - 20px)",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        size="small"
        color="customGreen"
        label="Search"
        variant="outlined"
        placeholder="All keywords"
        value={value}
      />
    </Box>
  );
}
