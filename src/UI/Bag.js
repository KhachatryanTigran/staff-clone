import React from "react";
import LuggageIcon from "@mui/icons-material/Luggage";
import { Tooltip } from "@mui/material";
const Bag = ({ ...props }) => {
  return (
    <Tooltip title="Ready for business trips" placement="left">
      <LuggageIcon {...props} />
    </Tooltip>
  );
};

export default Bag;
