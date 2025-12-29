import { DeleteOutlineRounded } from '@mui/icons-material';
import { Button } from '@mui/material';

type DeleteEntityButtonProps = {
    onClick: () => void
    entityLabel: string
}

export default function DeleteEntityButton({entityLabel, onClick}: DeleteEntityButtonProps) {
  return (
    <Button 
    size='large' 
    type='button' 
    fullWidth 
    color='error' 
    sx={{ padding: 1.5, gap: 1, textTransform: 'none', textWrap: 'nowrap'}} 
    variant='outlined' 
    onClick={onClick}>
        Remover {entityLabel}<DeleteOutlineRounded fontSize='small'/>
    </Button>
  )
}
