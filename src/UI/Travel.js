import React from "react";
import FlightIcon from "@mui/icons-material/Flight";
import { Tooltip } from "@mui/material";
const Travel = ({ ...props }) => {
  return (
    <Tooltip title="Ready to relocate" placement="left">
      <FlightIcon {...props} />
    </Tooltip>
  );
};

export default Travel;
