import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { COLORS } from "../constants/styles";

export default function CheckboxLabels({ lable, children }) {
  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          padding: 0,
          margin: 0,
        }}
        control={
          <>
            {" "}
            {children}
            <span>{lable}</span>
            <Checkbox
              defaultChecked
              size="medium"
              sx={{
                color: COLORS.customGreen,

                "&.Mui-checked": {
                  color: COLORS.customGreen,
                },
              }}
            />
          </>
        }
        label=""
      />
    </FormGroup>
  );
}
