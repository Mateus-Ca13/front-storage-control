
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useConfirmActionDialogStore } from '../../store/confirmActionDialogStore';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';




export default function ConfirmActionDialog() {

    const open = useConfirmActionDialogStore(state => state.open);
    const handleClose = useConfirmActionDialogStore(state => state.handleClose);
    const title = useConfirmActionDialogStore(state => state.title);
    const message = useConfirmActionDialogStore(state => state.message);
    const confirmAction = useConfirmActionDialogStore(state => state.confirmAction);
    const cancelAction = useConfirmActionDialogStore(state => state.cancelAction);

    useKeyboardShortcuts({
        'Escape': () => {
            cancelAction?.onClick();
        },
        'Enter': () => {
            confirmAction?.onClick();
        }
    }, 2);


  return (
      <Dialog
        
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions
        sx={{ p: 1.5}}>
          <Button onClick={cancelAction?.onClick} variant='outlined'>{cancelAction?.label}</Button>
          <Button onClick={confirmAction?.onClick} variant='contained'>{confirmAction?.label}</Button>
        </DialogActions>
      </Dialog>
  )
}
