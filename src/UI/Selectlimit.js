import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Selectlimit({ handleChange, limit }) {
  return (
    <FormControl color="customGreen" sx={{ m: 1, minWidth: 80 }} size="small">
      <InputLabel>Limit</InputLabel>
      <Select
        value={limit}
        label="Limit"
        onChange={(e) => handleChange(e.target.value)}
        autoWidth
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={15}>20</MenuItem>
      </Select>
    </FormControl>
  );
}
