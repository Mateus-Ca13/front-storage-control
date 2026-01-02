import { Divider, FormControl, Grid, InputLabel, MenuItem, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { stockSchema, type StockSchema } from '../../../../schemas/stockSchema'
import { useConfirmActionDialogStore } from '../../../../shared/store/confirmActionDialogStore'
import { useToastStore } from '../../../../shared/store/toastStore'
import { StockStatusTypeTuple, StockTypeTuple, type iStock, type StockStatusType, type StockType } from '../../../../shared/types/stock'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { deleteStockApi, updateStockApi } from '../../api/stocksApi'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import EditStateButton from '../../../../shared/components/EditStateButton/EditStateButton'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { formatStockStatus, formatStockType, formatTimestamp } from '../../../../shared/utils/formatters'
import { WarehouseRounded } from '@mui/icons-material'
import DeleteEntityButton from '../../../../shared/components/DeleteEntityButton/DeleteEntityButton'
import { useNavigate } from 'react-router-dom'

type StockEditFormProps = {
    stock: iStock | null    
}


export default function StockEditForm({stock}: StockEditFormProps) {

    const navigate = useNavigate()
    const renderConfirmActionDialog = useConfirmActionDialogStore(state => state.renderConfirmActionDialog) 
    const closeConfirmActionDialog = useConfirmActionDialogStore(state => state.handleClose)
    const renderToast = useToastStore(state => state.renderToast)
    const [editingStockData, setEditingStockData] = useState<iStock | null>(null)
    const [onEditing, setOnEditing] = useState<boolean>(false)
    const {register, handleSubmit, formState: { errors }} = useForm<StockSchema>({
            resolver: zodResolver(stockSchema),
        });
    
        useEffect(() => {
            setEditingStockData(stock)
        }, [stock])

    const handleOnSubmit = async (stockData: StockSchema) => {
        if(!stock || !stockData) return 
        
        renderConfirmActionDialog({
            title: 'Salvar alterações?',
            message: 'Você tem certeza que deseja salvar as alterações feitas neste estoque?',
            confirmAction: {label: 'Salvar', onClick: async () => {
                closeConfirmActionDialog()
                let returnedData = await updateStockApi(stock.id, stockData);
                if (returnedData.success){
                    renderToast({message: 'Edição de estoque concluída com sucesso!', type: 'success', })
                    console.log('Edição de estoque concluída com sucesso!', returnedData.data)
                }else{
                    renderToast({message: returnedData.message || 'Erro ao editar estoque', type: 'error', })
                    setEditingStockData(stock)
                }
            }},
            cancelAction: {label: 'Cancelar', onClick: () => {
                closeConfirmActionDialog()
                setOnEditing(true)
            }}
        })
    }

    const handleSelectChange = (value: number | string, prop: string) => {
        value === '' || value === null || value === 0 ?
        
        setEditingStockData({...editingStockData!, [prop]: null}) :
        setEditingStockData({...editingStockData!, [prop]: value}) 
    }

    const handleDeleteStock = async (stockId: number) => {
        renderConfirmActionDialog({
            title: 'Excluir Estoque?',
            message: 'Você tem certeza que deseja excluir este estoque? Essa ação não pode ser desfeita.',
            confirmAction: {label: 'Excluir', onClick: async () => {
                const returnedData = await deleteStockApi(stockId)

                if(returnedData?.success) {
                    closeConfirmActionDialog()
                    renderToast({
                        type: 'success',
                        message: 'Estoque excluído com sucesso!'
                    })
                    navigate(-1)
                } else {
                    closeConfirmActionDialog()
                    renderToast({
                        type: 'error',
                        message: returnedData?.message?? 'Erro ao excluir estoque!'
                    })
                };
            }},
            cancelAction: {label: 'Cancelar', onClick: () => {
                closeConfirmActionDialog()
            }}
        })
    }


  return (
    <Grid component={'form'} onSubmit={handleSubmit(handleOnSubmit)} container spacing={2} mb={2}>
        
        <Grid container justifyContent={'space-between'} mb={4} alignItems={'center'} size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}}>

            <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                <StartFlexBox gap={1}>
                    <WarehouseRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Detalhes de Estoque</Typography>
                    <Typography variant='body2'>Visualize todas as informações a respeito do estoque</Typography>
                </StartColumnBox>
                </StartFlexBox>
            </Grid>
            <Grid container gap={2} size={{xl: 6, lg: 6, md:6, sm: 12, xs: 12}}>
                {!onEditing && <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <DeleteEntityButton
                    entityLabel='estoque'
                    onClick={() => handleDeleteStock(stock!.id)}
                    />
                </Grid>
                }
                <EditStateButton
                state={onEditing} 
                setState={setOnEditing} 
                labelEntity='estoque' 
                cancelAction={() => setEditingStockData(stock)} 
                confirmAction={() => handleOnSubmit(editingStockData as StockSchema)}/>
            </Grid>
        </Grid>
        
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            sx={{ height: '100%'}} 
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth 
            variant='outlined'
            label="Nome" 
            {...register("name")} 
            error={!!errors.name}
            disabled={!onEditing}
            helperText={errors.name?.message}
            value={editingStockData?.name}
            onChange={(e)=> setEditingStockData({...editingStockData!, name: e.target.value})}
            />
        </Grid>
        <Grid size={{lg: 2, md: 2, sm: 12, xs: 12}}>
            <EditingTextField
            sx={{ height: '100%'}} 
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth 
            variant='outlined'
            label="ID"  
            disabled
            value={editingStockData?.id}
            
            />
        </Grid>
        <Grid size={{lg: 3, md: 3, sm: 12, xs: 12}}>
            <FormControl fullWidth>
                <InputLabel id="select-type">Tipo</InputLabel>
                <EditingSelect
                fullWidth
                variant='outlined' 
                label="Tipo" 
                labelId="select-type"
                {...register("type")} 
                onChange={(event)=> handleSelectChange(event.target.value as StockType, 'type')}
                error={!!errors.status}
                disabled={!onEditing}
                value={editingStockData?.type ?? 'CENTRAL'}
                required>
                    {StockTypeTuple.map((type) => <MenuItem key={type} value={type === null? '' : type}>{formatStockType(type)}</MenuItem>)}
                </EditingSelect>
            </FormControl>
        </Grid>
        <Grid size={{lg: 3, md: 3, sm: 12, xs: 12}}>    
            <FormControl fullWidth>
                <InputLabel id="select-status">Status</InputLabel>
                <EditingSelect
                sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: 'currentcolor'}}}
                fullWidth
                variant='outlined' 
                label="Status" 
                labelId="select-status"
                {...register("status")} 
                onChange={(event)=> handleSelectChange(event.target.value as StockStatusType, 'status')}
                error={!!errors.status}
                disabled={!onEditing}
                value={editingStockData?.status ?? 'ACTIVE'}
                required>
                    {StockStatusTypeTuple.map((status) => 
                    <MenuItem key={status} value={status === null? '' : status}>
                        <Typography 
                        borderRadius={2}
                        width={'fit-content'}
                        px={2}
                        
                        bgcolor={status === 'ACTIVE'? 'success.light': status === 'INACTIVE'? 'error.light':'warning.light'} 
                        color={status === 'ACTIVE'? 'success.dark': status === 'INACTIVE'? 'error.dark':'warning.dark'}>
                            {formatStockStatus(status)}
                        </Typography>
                    </MenuItem>)}
                </EditingSelect>
            </FormControl>
        </Grid>
        <Typography color='secondary'><em>Criado em {formatTimestamp(editingStockData?.createdAt ?? '')}</em></Typography>
            <Divider orientation='vertical' flexItem/>
            <Typography color='secondary'><em>Última atualização em {formatTimestamp(editingStockData?.updatedAt ?? '')}</em></Typography>
    </Grid>
  )
}
