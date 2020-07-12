import React from "react";
import { Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "center" | "right" | "left";
};

const SimpleSnackbar: React.FC<Props> = (props) => {
  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: props.vertical ? props.vertical : "bottom",
          horizontal: props.horizontal ? props.horizontal : "right",
        }}
        open={props.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={props.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default SimpleSnackbar;
