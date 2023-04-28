import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const RemoveIcon = ({ ...props }) => {
  return <DeleteForeverIcon sx={{ cursor: "pointer" }} {...props} />;
};

export default RemoveIcon;
