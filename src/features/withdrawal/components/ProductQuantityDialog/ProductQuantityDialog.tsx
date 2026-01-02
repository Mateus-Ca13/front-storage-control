import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import { useMovementStore } from '../../../movement/stores/useMovementStore'
import type { UseFormSetValue } from 'react-hook-form';
import type { AddProductToMovementSchema } from '../../../../schemas/MovementSchema';
import { useRef } from 'react';
import { useKeyboardShortcuts } from '../../../../shared/hooks/useKeyboardShortcuts';
import { useShortcutContextStore } from '../../../../shared/store/keyboardShortcutsStore';

type ProductQuantityDialogProps = {
    setProductQuantity: UseFormSetValue<AddProductToMovementSchema>;
    productQuantity?: number;
}

export default function ProductQuantityDialog({setProductQuantity, productQuantity}: ProductQuantityDialogProps) {
    const isQuantityModalOpen = useMovementStore(state => state.isProductQuantityModalOpen)
    const closeCreateModal = useMovementStore(state => state.closeProductQuantityModal)
    const quantityInputRef = useRef<HTMLInputElement>(null)

    function handleQuantitySubmit() {
        const quantityValue = quantityInputRef.current?.value;
        const quantityNumber = quantityValue ? parseInt(quantityValue, 10) : 1;
        setProductQuantity('quantity', quantityNumber);
        closeCreateModal();
    }

    useKeyboardShortcuts({
        'Escape': () => {
            closeCreateModal();

        },
        'Enter': () => {
            handleQuantitySubmit();
        },
    }, 2);

    const setQuantityRef = (el: HTMLInputElement | null) => {
    if (!el) return;            // desmontou
    quantityInputRef.current = el;

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



  return (
    <Dialog
      maxWidth='xs'
      fullWidth
      open={isQuantityModalOpen}
      onClose={closeCreateModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Definir quantidade de produto
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
                inputRef={setQuantityRef}
                inputMode='numeric'
                autoFocus
                defaultValue={productQuantity}
                margin="dense"
                id="quantity"
                focused
                label="Quantidade"
                type="number"
                fullWidth
                variant="outlined"
            />
        </DialogContent>
        <DialogActions sx={{px: 3, py: 2}}>
            <Button variant='outlined' sx={{ px: 4, py: 1, textTransform: 'none'}} onClick={closeCreateModal} color="primary">
                <Typography variant='h6'>Cancelar <strong>[ESC]</strong></Typography>
            </Button>
            <Button variant='contained' sx={{ px: 4, py: 1, textTransform: 'none'}} onClick={handleQuantitySubmit} color="primary" autoFocus>
                <Typography variant='h6'>Salvar <strong>[ENTER]</strong></Typography>
            </Button>
        </DialogActions>
    </Dialog>
  )
}
