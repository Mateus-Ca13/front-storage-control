import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Typography } from '@mui/material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import {  useForm } from 'react-hook-form'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { BorderColor } from '@mui/icons-material'
import { StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { useToastStore } from '../../../../shared/store/toastStore'
import { useCategoryStore } from '../../stores/useCategoryStore'
import { categorySchema, type CategorySchema } from '../../../../schemas/categorySchema'
import { createCategoryApi } from '../../api/categoryApi'
import { theme } from '../../../../theme/theme'

export default function CreateCategoryDialog() {

  const renderToast = useToastStore(state => state.renderToast)
  const isCreateModalOpen = useCategoryStore(state => state.isCreateModalOpen)
  const closeCreateModal = useCategoryStore(state => state.closeCreateModal)
  const {register, control, handleSubmit, formState: { errors, isSubmitting }, setError} = useForm<CategorySchema>({
          resolver: zodResolver(categorySchema),
          defaultValues: {
            name: '',
          }
          
      });
  const colorEntries = theme?.palette?.categoryColors
    ? Object.entries(theme.palette.categoryColors)
    : [];

  
      const handleOnSubmit = async (categoryData: CategorySchema) => {
          console.log(categoryData)
          const returnedData = await createCategoryApi(categoryData);
          if (returnedData.success){
              renderToast({message: 'Categoria criada com sucesso!', type: 'success', })
              console.log('Categoria criada com sucesso!', returnedData.data)
              closeCreateModal()
          }else{
              renderToast({message: returnedData.message || 'Erro ao criar categoria', type: 'error', })
          }
      }

  return (
    <Dialog
      maxWidth='sm'
      fullWidth
      open={isCreateModalOpen}
      onClose={closeCreateModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <StartFlexBox gap={1}>
            <BorderColor color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
            <StartColumnBox>
              <Typography fontWeight={700} variant='h5'>Criar nova categoria</Typography>
              <Typography variant='body2'>Preencha os dados para criar um nova categoria</Typography>
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
                placeholder='Nome da categoria'
                {...register("name")} 
                error={!!errors.name}
                helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>    
                  <FormControl fullWidth>
                    <InputLabel shrink id="select-colorPreset">Padrão de cor</InputLabel>
                    {colorEntries.length > 0 && <EditingSelect
                    fullWidth
                    variant='outlined' 
                    displayEmpty
                    defaultValue=""
                    label="Padrão de cor" 
                    labelId="select-colorPreset"
                    {...register("colorPreset")}  
                    error={!!errors.colorPreset}
                    required>
                      {colorEntries.map(([key, color], index) => 
                          <MenuItem key={key} value={index+1}>
                              <Typography width={'fit-content'} sx={{backgroundColor: color.light, color: color.dark, border: `1px solid ${color.main}`, borderRadius: 1, px: 2}} 
                              variant='body2'>
                                  Padrão {index+1}
                              </Typography>
                          </MenuItem>
                      )}                    
                    </EditingSelect>}
                    {errors.colorPreset && (
                      <FormHelperText error>{errors.colorPreset.message}</FormHelperText>
                    )}
                  </FormControl>
              </Grid>

            </Grid>
        </DialogContent>
        <DialogActions sx={{padding: 2}}>
          <Button onClick={closeCreateModal} sx={{px: 4, py: 1}} variant='outlined'>Cancelar</Button>
          <Button onClick={handleSubmit(handleOnSubmit)} sx={{px: 4, py: 1}} variant='contained'>Criar</Button>
        </DialogActions>
      </Dialog>
  )
}
