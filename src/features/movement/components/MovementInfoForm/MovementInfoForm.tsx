import {  FormControl, Grid, InputAdornment, InputLabel, MenuItem, Typography } from '@mui/material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { BetweenFlexBox, CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { MovementTuple, type iMovementFull } from '../../../../shared/types/movement'
import { formatMovementType, formatPrice, formatTimestamp } from '../../../../shared/utils/formatters'
import { CategoryOutlined, PersonOutlineOutlined, Schedule, SwapHorizRounded } from '@mui/icons-material'

type MovementInfoFormProps = {
    movementData: iMovementFull | null
}

export default function MovementInfoForm({ movementData } : MovementInfoFormProps) {
  return (
    <Grid columns={12} component={'form'}  container spacing={2} mb={2}>
        
        <Grid container justifyContent={'space-between'} mb={4} alignItems={'center'} size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}}>
            <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                <StartFlexBox gap={1}>
                    <SwapHorizRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Detalhes de Movimentação</Typography>
                    <Typography variant='body2'>Visualize todas as informações a respeito da movimentação</Typography>
                </StartColumnBox>
                </StartFlexBox>
            </Grid>
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <StartColumnBox gap={2}>
                    <BetweenFlexBox gap={2}>
                        <EditingTextField
                        sx={{ height: '100%'}} 
                        slotProps={{ inputLabel: {shrink: true} }}
                        fullWidth 
                        variant='outlined'
                        label="ID da movimentação" 
                        disabled
                        value={movementData?.id}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="select-status">Tipo de movimentação</InputLabel>
                            <EditingSelect
                            sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: 'currentcolor'}}}
                            fullWidth
                            variant='outlined' 
                            label="Tipo de movimentação" 
                            labelId="select-status"
                            disabled
                            value={movementData?.type ?? 'ACTIVE'}>
                                {MovementTuple.map((status) => 
                                <MenuItem key={status} value={status === null? '' : status}>
                                    <Typography 
                                        borderRadius={2}
                                        width={'fit-content'}
                                        px={2}
                                        bgcolor={movementData?.type === 'ENTRY'? 'success.light': movementData?.type === 'EXIT'? 'error.light':'warning.light'} 
                                        color={movementData?.type === 'ENTRY'? 'success.dark': movementData?.type === 'EXIT'? 'error.dark':'warning.dark'}>
                                        {formatMovementType(movementData?.type?? 'ENTRY')}
                                    </Typography>
                                </MenuItem>)}
                            </EditingSelect>
                        </FormControl>
                    </BetweenFlexBox>
                <EditingTextField
                sx={{ height: '100%'}} 
                slotProps={{ inputLabel: {shrink: true} }}
                fullWidth 
                variant='outlined'
                label="Observações" 
                disabled
                value={movementData?.observations}
                />
            </StartColumnBox>
        </Grid>
        <Grid size={{lg: 5, md: 5, sm: 12, xs: 12}}>
            <StartColumnBox gap={2}>
                <BetweenFlexBox gap={2}>
                    <EditingTextField
                    sx={{ height: '100%'}} 
                    slotProps={{ inputLabel: {shrink: true} }}
                    fullWidth 
                    variant='outlined'
                    label="Origem" 
                    disabled
                    value={movementData?.originStock?.name}
                    />
                    <Typography variant='h6'>→</Typography>
                    <EditingTextField
                    sx={{ height: '100%'}} 
                    slotProps={{ inputLabel: {shrink: true} }}
                    fullWidth 
                    variant='outlined'
                    label="Destino" 
                    disabled
                    value={movementData?.destinationStock?.name}
                    />
                </BetweenFlexBox>
                <EditingTextField
                sx={{ height: '100%'}} 
                slotProps={{ inputLabel: {shrink: true}, input: { startAdornment: <InputAdornment position="start"><Schedule fontSize="small"/></InputAdornment>,} }}
                fullWidth 
                variant='outlined'
                label="Data e Hora" 
                disabled
                value={movementData?.createdAt ? formatTimestamp(movementData?.createdAt!): ''}
                />
            </StartColumnBox>
        </Grid>
        <Grid size={{lg: 3, md: 3, sm: 12, xs: 12}}>
            <StartColumnBox gap={2}>
                <EditingTextField
                sx={{ height: '100%'}} 
                slotProps={{ inputLabel: {shrink: true}, input: { startAdornment: <InputAdornment position="start"><PersonOutlineOutlined/></InputAdornment>,}}}
                fullWidth 
                variant='outlined'
                label="Usuário" 
                disabled
                value={movementData?.userCreator?.name}
                />
                <BetweenFlexBox gap={2}>
                    <EditingTextField
                    sx={{ height: '100%'}} 
                    slotProps={{ inputLabel: {shrink: true}, input: { startAdornment: <InputAdornment position="start"><CategoryOutlined/></InputAdornment>} }}
                    fullWidth 
                    variant='outlined'
                    label="Total de produtos" 
                    disabled
                    value={movementData?.products.reduce((acc, curr) => acc + curr.quantity, 0).toString()}
                    />
                    <EditingTextField
                    sx={{ height: '100%'}} 
                    slotProps={{ inputLabel: {shrink: true}, input: { startAdornment: <InputAdornment position="start">R$</InputAdornment>} }}
                    fullWidth 
                    variant='outlined'
                    label="Valor total de produtos" 
                    disabled
                    value={formatPrice(movementData?.products.reduce((acc, curr) => acc + (Number(curr.pricePerUnit) * Number(curr.quantity)), 0)?? 0)}
                    />
                </BetweenFlexBox>
            </StartColumnBox>
        </Grid>
    </Grid>

  )
}
