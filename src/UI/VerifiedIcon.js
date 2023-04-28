import React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
const BassicVerifiedIcon = ({ customStyles, ...props }) => {
  return (
    <VerifiedIcon
      color="customGreen"
      sx={{ ...customStyles }}
      {...props}
    ></VerifiedIcon>
  );
};

export default BassicVerifiedIcon;
