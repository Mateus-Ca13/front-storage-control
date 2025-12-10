import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useMovementStore } from '../../../movement/stores/useMovementStore'
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import type {  MovementSchema } from '../../../../schemas/MovementSchema';
import { useRef } from 'react';
import { useKeyboardShortcuts } from '../../../../shared/hooks/useKeyboardShortcuts';
import { useShortcutContextStore } from '../../../../shared/store/keyboardShortcutsStore';

type ObservationsDialogDialogProps = {
    formValueSetter: UseFormSetValue<MovementSchema>;
    formValueGetter: UseFormGetValues<MovementSchema>;
}

export default function ObservationsDialog({formValueSetter, formValueGetter}: ObservationsDialogDialogProps) {
    const isObservationModalOpen = useMovementStore(state => state.isObservationModalOpen)
    const closeObservationsDialog = useMovementStore(state => state.closeObservationModal)
    const observationInputRef = useRef<HTMLInputElement>(null)


    useKeyboardShortcuts({
        'Escape': () => {
            closeObservationsDialog();

        },
        'Enter': () => {
            handleObservationSubmit();
        },
    }, 2);

    const setObservationRef = (el: HTMLInputElement | null) => {
    if (!el) return;            // desmontou
    observationInputRef.current = el;

    // Esse código só roda quando o <input> REAL existe no DOM
    const enforceFocus = () => {
        const stack = useShortcutContextStore.getState().contextStack;
        const isMainContextActive = stack.length === 2;
        if (isMainContextActive) el.focus();
    };

    el.addEventListener("blur", enforceFocus);
    el.focus();

    // limpa quando desmontar
    return () => el.removeEventListener("blur", enforceFocus);
    };


    function handleObservationSubmit() {
        const observationValue = observationInputRef.current?.value;
        const observationText = observationValue ? observationValue : '';
        formValueSetter('observations', observationText);
        closeObservationsDialog();
    }

  return (
    <Dialog
      maxWidth='md'
      fullWidth
      open={isObservationModalOpen}
      onClose={closeObservationsDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Definir observações de movimentação
        </DialogTitle>
        <DialogContent>
            <TextField
                sx={{
                    height: '100%',
                    "& .MuiInputBase-input": {
                    fontSize: "1.5rem",      // tamanho do texto digitado
                    },
                    "& .MuiFormHelperText-root": {
                    fontSize: "1rem",     // helper/error
                    },
                }}
                slotProps={{ input: { inputProps: { min: 1 } } }}
                inputRef={setObservationRef}
                autoFocus
                multiline
                minRows={4}
                defaultValue={formValueGetter('observations')}
                margin="dense"
                id="observations"
                focused
                label="Observações"
                fullWidth
                variant="outlined"
            />
        </DialogContent>
        <DialogActions sx={{px: 3, py: 2}}>
            <Button variant='outlined' sx={{ px: 4, py: 1, textTransform: 'none'}} onClick={closeObservationsDialog} color="primary">
                <Typography variant='h6'>Cancelar <strong>[ESC]</strong></Typography>
            </Button>
            <Button variant='contained' sx={{ px: 4, py: 1, textTransform: 'none'}} onClick={handleObservationSubmit} color="primary" autoFocus>
                <Typography variant='h6'>Salvar <strong>[ENTER]</strong></Typography>
            </Button>
        </DialogActions>
    </Dialog>
  )
}
