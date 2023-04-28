import React from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
function SimpleMenu({
  title,
  onClickLoginUser,
  onClickLoginRegiter,
  navigate,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-owns={anchorEl ? "simple-menu" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        onMouseOver={handleClick}
      >
        {title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
      >
        <MenuItem
          onClick={() => {
            onClickLoginUser();
            handleClose();
          }}
        >
          {" "}
          Sign In
        </MenuItem>
        <MenuItem
          onClick={() => {
            onClickLoginRegiter();
            handleClose();
          }}
        >
          {" "}
          {navigate ? (
            <NavLink to="/company/register">Register</NavLink>
          ) : (
            "Register"
          )}
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SimpleMenu;
