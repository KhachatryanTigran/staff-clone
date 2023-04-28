import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React from "react";

const HeartIcon = ({ customStyles, ...props }) => {
  return (
    <FavoriteBorderIcon
      variant="heart"
      sx={{ ...customStyles }}
      {...props}
    ></FavoriteBorderIcon>
  );
};

export default HeartIcon;
