import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { useMovementStore } from '../../stores/useMovementStore'
import { CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded, SwapHorizontalCircleOutlined, SwapHorizRounded } from '@mui/icons-material'

export default function CreateMovementDialog() {

    const isMovementModalOpen = useMovementStore(state => state.isMovementModalOpen)
    const closeMovementModal = useMovementStore(state => state.closeMovementModal)
    const openEntryModal = useMovementStore(state => state.openEntryModal)
    const openTransferModal = useMovementStore(state => state.openTransferModal)
    const openExitModal = useMovementStore(state => state.openExitModal)


    const handleOpenTransferModal = () => {
      closeMovementModal()
      openTransferModal()
    }

    const handleOpenExitModal = () => {
      closeMovementModal()
      openExitModal()
    }
    
    const handleOpenEntryModal = () => {
      closeMovementModal()
      openEntryModal()
    }
    
  return (
    <Dialog
      maxWidth='md'
      fullWidth
      open={isMovementModalOpen}
      onClose={closeMovementModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <StartFlexBox gap={1}>
            <SwapHorizRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
            <StartColumnBox>
              <Typography fontWeight={600} variant='h5'>Criar movimentação</Typography>
              <Typography variant='body2'>Selecione o tipo de movimentação que deseja realizar</Typography>
            </StartColumnBox>
          </StartFlexBox>
        </DialogTitle>
        <DialogContent>
            <CenterFlexBox my={1} gap={2}>
                <Button fullWidth onClick={()=>{handleOpenEntryModal()}} sx={{ padding: 2, borderWidth: 2, display: 'flex', flexDirection: 'column', gap: 1}} variant='contained'>
                    <AddCircleOutlineRounded sx={{fontSize: 48}}/>
                    Entrada
                </Button>
                <Button fullWidth onClick={()=>{handleOpenTransferModal()}} sx={{ padding: 2, borderWidth: 2, display: 'flex', flexDirection: 'column', gap: 1}} variant='contained'>
                    <SwapHorizontalCircleOutlined sx={{fontSize: 48}}/>
                    Transferência
                </Button>
                <Button fullWidth onClick={()=>{handleOpenExitModal()}} sx={{ padding: 2, borderWidth: 2, display: 'flex', flexDirection: 'column', gap: 1}} variant='contained'>
                    <RemoveCircleOutlineRounded sx={{fontSize: 48}}/>
                    Saída
                </Button>
            </CenterFlexBox>
        </DialogContent>
        <DialogActions sx={{py: 2, px: 3}}>
          <Button onClick={closeMovementModal} sx={{px: 4, py: 1}} variant='outlined'>Cancelar</Button>
        </DialogActions>
      </Dialog>
  )
}
