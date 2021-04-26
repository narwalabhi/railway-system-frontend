import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from "@material-ui/icons/Save";
import Controls from '../controls/Controls'
import Add from "../trains/add";

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (

    <div>
      <Dialog
        open={openPopup}
        onClose={() => {
            console.log(openPopup)
            setOpenPopup(false)}}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        {/* <DialogActions>
          <Button  color="primary">
            Cancel
          </Button>
          <Button  color="primary" startIcon={<SaveIcon/>}>
            Save
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
