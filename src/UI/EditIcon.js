import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function EditActionButtons({ onClick }) {
  return (
    <Tooltip title="Edit" placement="top-start">
      <Box>
        <Fab color="customGreen" size="small">
          <EditIcon onClick={onClick} sx={{ width: "28px", height: "20px" }} />
        </Fab>
      </Box>
    </Tooltip>
  );
}
