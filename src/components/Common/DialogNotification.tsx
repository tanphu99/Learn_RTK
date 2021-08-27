import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

export interface DialogNotificationProps {
  titleNoti: string;
  contentNoti?: string;

  toggleDialog: boolean;
  handleCloseDialog: () => void;
  handleConfirmDialog: () => void;
}

const DialogNotification = ({
  titleNoti,
  contentNoti,
  toggleDialog,
  handleCloseDialog,
  handleConfirmDialog,
}: DialogNotificationProps) => {
  const CONTENT_NOTI: string = contentNoti || 'Are you sure to delete ? ';

  return (
    <Dialog
      open={toggleDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{titleNoti}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {CONTENT_NOTI}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="default" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleConfirmDialog}
          color="secondary"
          variant="contained"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogNotification;
