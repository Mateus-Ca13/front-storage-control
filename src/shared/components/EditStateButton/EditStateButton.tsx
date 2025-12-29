import { Button, Grid } from '@mui/material'
import { ClearRounded, CreateRounded, DoneRounded } from '@mui/icons-material'

type EditStateButtonProps = {
    state: boolean
    setState: (value: boolean) => void
    labelEntity: string
    confirmAction: () => void
    cancelAction: () => void
}

export default function EditStateButton({state, setState, labelEntity, confirmAction, cancelAction}: EditStateButtonProps) {

    const renderEditStateButton = (state: boolean) => {
        if (!state) {
            return (
                <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' variant='contained' fullWidth sx={{ padding: 1.5, gap: 1, textTransform: 'none', textWrap: 'nowrap'}} onClick={()=> setState(true)}>Editar {labelEntity} <CreateRounded fontSize='small'/></Button>
                </Grid>
            )
        } else {
            return (<>
                <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' type='reset' fullWidth sx={{ padding: 1.5, gap: 1, textTransform: 'none', textWrap: 'nowrap'}} variant='outlined' onClick={()=> {setState(false); cancelAction()}}>Cancelar edição <ClearRounded fontSize='small'/></Button>
                </Grid>
                <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' type='submit' fullWidth sx={{ padding: 1.5, gap: 1, textTransform: 'none', textWrap: 'nowrap'}} variant='contained' onClick={()=> {setState(false); confirmAction()}}>Salvar edição <DoneRounded fontSize='small'/></Button>
                </Grid>
            </>)
        }
    }



  return renderEditStateButton(state)
}