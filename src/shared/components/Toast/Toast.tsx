import { Alert, Snackbar } from '@mui/material';
import { useToastStore } from '../../store/toastStore';



export default function Toast() {
    const open = useToastStore(state => state.open);
    const closeToast = useToastStore(state => state.closeToast);
    const message = useToastStore(state => state.message);
    const type = useToastStore(state => state.type);
    const action = useToastStore(state => state.action);



  return (
    <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    open={open}
    autoHideDuration={6000}
    onClose={closeToast}
    action={action}
    >
        <Alert
            onClose={closeToast}
            severity={type}
            variant="filled"
            sx={{ width: '100%', color: 'white', fontSize: 16}}
        >   
            {message}
        </Alert>
    </Snackbar>
  )
}
