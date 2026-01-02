import { useEffect, useState } from 'react'
import { useProductStore } from '../../stores/useProductStore'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Typography, useTheme } from '@mui/material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductSchema } from '../../../../schemas/productSchema'
import { Controller, useForm } from 'react-hook-form'
import { ProductMeasurementTuple } from '../../../../shared/types/product'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import type { iCategoryColumnConfig } from '../../../../shared/types/category'
import { useCategoryQuery } from '../../../category/hooks/useCategoryQuery'
import { formatCurrency, formatMeasurementUnit } from '../../../../shared/utils/formatters'
import { BorderColor, InfoOutlineRounded, UploadRounded } from '@mui/icons-material'
import { LightTooltip } from '../../../../shared/components/Tooltip/Tooltip'
import { CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { createProductApi } from '../../api/productsApi'
import { useToastStore } from '../../../../shared/store/toastStore'
import { queryClient } from '../../../../lib/reactQueryClient'

export default function CreateProductDialog() {

  const theme = useTheme()
  const renderToast = useToastStore(state => state.renderToast)
  const isCreateModalOpen = useProductStore(state => state.isCreateModalOpen)
  const closeCreateModal = useProductStore(state => state.closeCreateModal)
  const openImportProductModal = useProductStore(state => state.openImportProductModal)
  const {data } = useCategoryQuery(0, 100, '', {})
  const [categories, setCategories] = useState<iCategoryColumnConfig[]>([])
  const {register, control, handleSubmit, formState: { errors }, reset: resetForm} = useForm<ProductSchema>({
          resolver: zodResolver(productSchema),
          defaultValues: {
            name: '',
            codebar: null,
            description: '',
            lastPrice: 0,
            measurement: undefined,
            categoryId: null,
          }
          
      });
  
  useEffect(() => {
      const categories = data?.data?.categories ?? [];
  
      setCategories(categories);
    } , [data]);
      
  
      const handleOnSubmit = async (productData: ProductSchema) => {
          console.log(productData)
          const returnedData = await createProductApi(productData);
          if (returnedData.success){
              renderToast({message: 'Produto criado com sucesso!', type: 'success', })
              console.log('Produto criado com sucesso!', returnedData.data)
              closeCreateModal()
              queryClient.invalidateQueries({ queryKey: ['products'] });
          }else{
              renderToast({message: returnedData.message || 'Erro ao criar produto', type: 'error', })
          }
      }

      const handleCloseDialog = () => {
        closeCreateModal()
        resetForm()
      }


  return (
    isCreateModalOpen && <Dialog
        open={isCreateModalOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <StartFlexBox gap={1}>
            <BorderColor color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
            <StartColumnBox>
              <Typography fontWeight={700} variant='h5'>Criar novo produto</Typography>
              <Typography variant='body2'>Preencha os dados para criar um novo produto</Typography>
            </StartColumnBox>
            <LightTooltip title="Importar lista de produtos via .csv">
              <Button 
              onClick={()=>{openImportProductModal(); handleCloseDialog()}}
              sx={{minWidth: 0, backgroundColor: 'secondary.light', borderRadius: 1, px: 1.5, cursor: 'pointer', border: `1px solid ${theme.palette.secondary.main}`}} >
                <UploadRounded fontSize='small' />
              </Button>
            </LightTooltip>
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
                placeholder='Nome do produto'
                {...register("name")} 
                error={!!errors.name}
                helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <EditingTextField
                slotProps={{ inputLabel: {shrink: true}}}
                fullWidth
                variant='outlined' 
                label={
                <LightTooltip title='O código de barras não é obrigatório na criação de um produto, mas será necessário para a integração com o sistema de movimentações do sistema. 
                    Lembre-se de cadastrá-lo em algum momento para poder usufruir da identificação do produto.'>
                      <CenterFlexBox gap={1}>Código de barras <InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                    </LightTooltip>}
                {...register("codebar", {
                  setValueAs: (v) => v === '' || v === null? null : v.replace(/\D/g, ''),
                }
              )} 
                error={!!errors.codebar}
                onChange={(e)=>{
                  const value = e.target.value.replace(/\D/g, '');
                  e.target.value = value.length === 0 ? '' : value
                }}
                helperText={errors.codebar?.message}
                placeholder='XXXXXXXXXXXX'
                />
            </Grid>
            <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
                <EditingTextField 
                multiline
                rows={4}
                sx={{height: '100%', flex: 1}}
                slotProps={{ inputLabel: {shrink: true} }}
                fullWidth
                variant='outlined' 
                label="Descrição" 
                placeholder='Descrição do produto'
                {...register("description")} 
                error={!!errors.description}
                helperText={errors.description?.message}
                 />
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
              <Controller
                name="lastPrice"
                control={control}
                rules={{ required: "Campo obrigatório" }}
                render={({ field }) => (
                  <EditingTextField
                    fullWidth
                    label={
                    <LightTooltip title=' 
                    Valor utilizado como referencial para cálculos de valor de estoque. Em cada nova entrada do produto, o último preço pago é alterado com base no valor presente na nota fiscal.'>
                      <CenterFlexBox gap={1}>Último preço pago<InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                    </LightTooltip>}
                    slotProps={{
                      input: { startAdornment: <InputAdornment position="start">R$</InputAdornment> },
                    }}
                    error={!!errors.lastPrice}
                    helperText={errors.lastPrice?.message}
                    value={formatCurrency(field.value?.toString() ?? '')}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const numeric = raw.replace(/\D/g, "");
                      const value = Number(numeric) / 100;
                      field.onChange(value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <EditingTextField
                slotProps={{ inputLabel: {shrink: true} }}
                type='number'
                fullWidth
                variant='outlined' 
                label={
                    <LightTooltip title='Valor utilizado como métrica para determinar avisos de estoque baixo.'>
                      <CenterFlexBox gap={1}>Estoque mínimo<InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                    </LightTooltip>}
                {...register("minStock", {valueAsNumber: true})} 
                error={!!errors.minStock}
                placeholder='Quantidade mínima'
                helperText={errors.minStock?.message}
                 />
            </Grid>
    
                    <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>    
                        <FormControl fullWidth>
                          <InputLabel shrink id="select-measurement">Unidade de medida</InputLabel>
                          <EditingSelect
                          fullWidth
                          variant='outlined' 
                          displayEmpty
                          defaultValue=""
                          label="Unidade de medida" 
                          labelId="select-measurement"
                          {...register("measurement")}  
                          error={!!errors.measurement}
                          required>
                              {ProductMeasurementTuple.map((unit) => <MenuItem key={unit} value={unit === null? '' : unit}>{unit} ({formatMeasurementUnit(unit)})</MenuItem>)}
                          </EditingSelect>
                          {errors.measurement && (
                            <FormHelperText error>{errors.measurement.message}</FormHelperText>
                          )}
                        </FormControl>
                    </Grid>
                    
                    <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                      <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: "Campo obrigatório" }}
                    render={({ field }) => (
                        <FormControl fullWidth>
                          <InputLabel shrink id="select-categoryId">Categoria</InputLabel>
                          <EditingSelect
                          fullWidth
                          labelId='select-categoryId'
                          variant='outlined' 
                          displayEmpty
                          defaultValue=""
                          MenuProps={{
                              PaperProps: {
                                  style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                              },
                          }}
                          label="Categoria" 
                          error={!!errors.categoryId}
                          onChange={(event)=> {
                            field.onChange(event.target.value === '' ? null : Number(event.target.value))
                          }}
                          >
                                  <MenuItem value={''}><em>—</em></MenuItem>
                                  {categories.map((category) => <MenuItem key={category.id} value={String(category.id)}>{category.name}</MenuItem>)}
                          </EditingSelect>
                          {errors.categoryId && (
                          <FormHelperText error>{errors.categoryId.message}</FormHelperText>
                          )}
                        </FormControl>
                      )}/>
                    
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
