import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import EditIcon from "@mui/icons-material/Edit";

export default function EditActionButtons({ onClick }) {
  return (
    <Box>
      <Fab color="success" size="small">
        <EditIcon onClick={onClick} sx={{ width: "28px", height: "20px" }} />
      </Fab>
    </Box>
  );
}
