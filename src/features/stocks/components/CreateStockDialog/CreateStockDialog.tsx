import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Typography } from '@mui/material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { formatStockStatus, formatStockType } from '../../../../shared/utils/formatters'
import { BorderColor } from '@mui/icons-material'
import { StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { useToastStore } from '../../../../shared/store/toastStore'
import { stockSchema, type StockSchema } from '../../../../schemas/stockSchema'
import { useStockStore } from '../../stores/useStockStore'
import { createStockApi } from '../../api/stocksApi'
import { StockStatusTypeTuple, StockTypeTuple } from '../../../../shared/types/stock'
import { queryClient } from '../../../../lib/reactQueryClient'

export default function CreateStockDialog() {

  const renderToast = useToastStore(state => state.renderToast)
  const isCreateModalOpen = useStockStore(state => state.isCreateModalOpen)
  const closeCreateModal = useStockStore(state => state.closeCreateModal)
  const {register, control, handleSubmit, formState: { errors, isSubmitting }, setError, reset: resetForm} = useForm<StockSchema>({
          resolver: zodResolver(stockSchema),
          defaultValues: {
            name: '',      
          }
          
      });
  
      const handleOnSubmit = async (stockData: StockSchema) => {
          console.log(stockData)
          const returnedData = await createStockApi(stockData);
          if (returnedData.success){
              renderToast({message: 'Estoque criado com sucesso!', type: 'success', })
              console.log('Estoque criado com sucesso!', returnedData.data)
              handleCloseDialog()
              queryClient.invalidateQueries({ queryKey: ['stocks'] });
          }else{
              renderToast({message: returnedData.message || 'Erro ao criar estoque', type: 'error', })
          }
      }

      const handleCloseDialog = () => {
        closeCreateModal()
        resetForm()
      }



  return (
    isCreateModalOpen && <Dialog
        fullWidth
        maxWidth='sm'
        open={isCreateModalOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <StartFlexBox gap={1}>
            <BorderColor color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
            <StartColumnBox>
              <Typography fontWeight={700} variant='h5'>Criar novo estoque</Typography>
              <Typography variant='body2'>Preencha os dados para criar um novo estoque</Typography>
            </StartColumnBox>
          </StartFlexBox>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2} mb={2} mt={2}>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <EditingTextField
                sx={{ height: '100%'}} 
                slotProps={{ inputLabel: {shrink: true} }}
                fullWidth 
                variant='outlined'
                label="Nome" 
                placeholder='Nome do estoque'
                {...register("name")} 
                error={!!errors.name}
                helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>    
                  <FormControl fullWidth>
                    <InputLabel shrink id="select-status">Status</InputLabel>
                    <EditingSelect
                    fullWidth
                    variant='outlined' 
                    label="Status" 
                    displayEmpty
                    defaultValue=""
                    labelId="select-status"
                    {...register("status")}  
                    error={!!errors.status}
                    required>
                        {StockStatusTypeTuple.map((status) => <MenuItem key={status} value={status === null? '' : status}>{formatStockStatus(status)}</MenuItem>)}
                    </EditingSelect>
                    {errors.status && (
                      <FormHelperText error>{errors.status.message}</FormHelperText>
                    )}
                  </FormControl>
              </Grid>
              <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>    
                  <FormControl fullWidth>
                    <InputLabel shrink id="select-type">Tipo de estoque</InputLabel>
                    <EditingSelect
                    fullWidth
                    variant='outlined' 
                    label="Tipo de estoque" 
                    displayEmpty
                    defaultValue=""
                    labelId="select-type"
                    {...register("type")}  
                    error={!!errors.type}
                    required>
                        {StockTypeTuple.map((type) => <MenuItem key={type} value={type === null? '' : type}>{formatStockType(type)}</MenuItem>)}
                    </EditingSelect>
                    {errors.type && (
                      <FormHelperText error>{errors.type.message}</FormHelperText>
                    )}
                  </FormControl>
              </Grid>

            </Grid>
        </DialogContent>
        <DialogActions sx={{padding: 2}}>
          <Button onClick={handleCloseDialog} sx={{px: 4, py: 1}} variant='outlined'>Cancelar</Button>
          <Button onClick={handleSubmit(handleOnSubmit)} sx={{px: 4, py: 1}} variant='contained'>Criar</Button>
        </DialogActions>
      </Dialog>
  )
}
