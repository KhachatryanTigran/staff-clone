import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  children,
  open,
  handleClose,
  customStylesTitle,
  title,
}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          sx: {},
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            height: "50px",
            backgroundColor: " #46af3a",
          }}
        >
          {" "}
          <CloseIcon
            sx={{ fontSize: "32px", cursor: "pointer", color: "#fff" }}
            onClick={handleClose}
          ></CloseIcon>
        </div>{" "}
        <DialogTitle sx={{ textAlign: "center", ...customStylesTitle }}>
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}
