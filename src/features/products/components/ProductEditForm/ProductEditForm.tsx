import { useEffect, useState } from 'react'
import { ProductMeasurementTuple, type iProduct, type ProductMeasurementType } from '../../../../shared/types/product'
import { Divider, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Typography, useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { productSchema, type ProductSchema } from '../../../../schemas/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { deleteProductApi, updateProductApi } from '../../api/productsApi'
import { formatCurrency, formatMeasurementUnit, formatTimestamp } from '../../../../shared/utils/formatters'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { useCategoryQuery } from '../../../category/hooks/useCategoryQuery'
import type { iCategoryColumnConfig } from '../../../../shared/types/category'
import EditStateButton from '../../../../shared/components/EditStateButton/EditStateButton'
import { CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { useToastStore } from '../../../../shared/store/toastStore'
import { useConfirmActionDialogStore } from '../../../../shared/store/confirmActionDialogStore'
import { Category, InfoOutlineRounded } from '@mui/icons-material'
import { LightTooltip } from '../../../../shared/components/Tooltip/Tooltip'
import DeleteEntityButton from '../../../../shared/components/DeleteEntityButton/DeleteEntityButton'
import { useNavigate } from 'react-router-dom'

type ProductEditFormProps = {
    product: iProduct | null    
}


export default function ProductEditForm({ product } : ProductEditFormProps) {

    const navigate = useNavigate()
    const theme = useTheme()
    const renderConfirmActionDialog = useConfirmActionDialogStore(state => state.renderConfirmActionDialog) 
    const closeConfirmActionDialog = useConfirmActionDialogStore(state => state.handleClose)
    const renderToast = useToastStore(state => state.renderToast)
    const [editingProductData, setEditingProductData] = useState<iProduct | null>(null)
    const {data, error, isLoading } = useCategoryQuery(0, 100, '', {})
    const [onEditing, setOnEditing] = useState<boolean>(false)
    const [categories, setCategories] = useState<iCategoryColumnConfig[]>([])
    const {register, handleSubmit, formState: { errors, isSubmitting }, setError} = useForm<ProductSchema>({
            resolver: zodResolver(productSchema),
        });

    useEffect(() => {
    const categories = data?.data?.categories ?? [];

    setCategories(categories);
  } , [data]);
    

    useEffect(() => {
        setEditingProductData(product)
    }, [product])

    const handleOnSubmit = async (productData: ProductSchema) => {
        if(!product || !productData) return 
        
        renderConfirmActionDialog({
            title: 'Salvar alterações?',
            message: 'Você tem certeza que deseja salvar as alterações feitas neste produto?',
            confirmAction: {label: 'Salvar', onClick: async () => {
                closeConfirmActionDialog()
                let returnedData = await updateProductApi(product.id, productData);
                if (returnedData.success){
                    renderToast({message: 'Edição de produto concluída com sucesso!', type: 'success', })
                    console.log('Edição de produto concluída com sucesso!', returnedData.data)
                }else{
                    renderToast({message: returnedData.message || 'Erro ao editar produto', type: 'error', })
                    setEditingProductData(product)
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
        
        setEditingProductData({...editingProductData!, [prop]: null}) :
        setEditingProductData({...editingProductData!, [prop]: value}) 
    }

    const handleDeleteProduct = async (productId: number) => {
        renderConfirmActionDialog({
        title: 'Excluir produto?',
        message: 'Você tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita.',
        confirmAction: {label: 'Excluir', onClick: async () => {
            const returnedData = await deleteProductApi(productId)

            if(returnedData?.success) {
                closeConfirmActionDialog()
                renderToast({
                    type: 'success',
                    message: 'Produto excluído com sucesso!'
                })
                navigate(-1)
            } else {
                closeConfirmActionDialog()
                renderToast({
                    type: 'error',
                    message: returnedData.message?? 'Erro ao excluir produto!'
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
                    <Category color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Detalhes de Produto</Typography>
                    <Typography variant='body2'>Visualize todas as informações a respeito do produto</Typography>
                </StartColumnBox>
                </StartFlexBox>
            </Grid>
            <Grid container gap={2} size={{xl: 6, lg: 6, md:6, sm: 12, xs: 12}}>
                {!onEditing && <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <DeleteEntityButton
                    entityLabel='produto'
                    onClick={() => handleDeleteProduct(product!.id)}
                    />
                </Grid>
                }
                <EditStateButton
                state={onEditing} 
                setState={setOnEditing} 
                labelEntity='produto' 
                cancelAction={() => setEditingProductData(product)} 
                confirmAction={() => handleOnSubmit(editingProductData as ProductSchema)}/>
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
                value={editingProductData?.name}
                onChange={(e)=> setEditingProductData({...editingProductData!, name: e.target.value})}
                />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth
            variant='outlined' 
            label={
                <LightTooltip title='O código de barras não é obrigatório na criação de um produto, mas será necessário para a integração com o sistema de movimentações do sistema. 
                    Lembre-se de cadastrá-lo em algum momento para poder usufruir da identificação do produto.'>
                      <CenterFlexBox gap={1}>Código de barras <InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                    </LightTooltip>}
            {...register("codebar")} 
            error={!!errors.codebar}
            disabled={!onEditing}
            helperText={errors.codebar?.message}
            value={editingProductData?.codebar ?? 'Não registrado'}
            sx={{
                '.MuiInputBase-input, & .MuiInputBase-input.Mui-disabled' : {
                    color: editingProductData?.codebar ? theme.palette.common.black : theme.palette.error.dark,
                    WebkitTextFillColor: editingProductData?.codebar ? theme.palette.common.black : theme.palette.error.dark,
                }
            }}
            onChange={(e)=>{
                const value = e.target.value.replace(/\D/g, '');
                 setEditingProductData({...editingProductData!, codebar: value.length === 0 ? null : value})}}
            />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            type='number'
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth
            variant='outlined' 
            label="ID do Produto" 
            disabled={true}
            value={editingProductData?.id}
            />
        </Grid>
    
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}} container spacing={2}>
            <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
                <EditingTextField 
                multiline
                rows={4}
                sx={{height: '100%', flex: 1}}
                slotProps={{ inputLabel: {shrink: true} }}
                fullWidth
                variant='outlined' 
                label="Descrição" 
                {...register("description")} 
                error={!!errors.description}
                helperText={errors.description?.message}
                value={editingProductData?.description}
                disabled={!onEditing}
                onChange={(e)=> setEditingProductData({...editingProductData!, description: e.target.value})}
                required />
            </Grid>
        
            <Grid container spacing={2} size={{lg: 8, md: 8, sm: 12, xs: 12}}>
                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                    <EditingTextField
                    fullWidth
                    label={
                        <LightTooltip title=' 
                        Valor utilizado como referencial para cálculos de valor de estoque. Em cada nova entrada do produto, o último preço pago é alterado com base no valor presente na nota fiscal.'>
                            <CenterFlexBox gap={1}>Último preço pago<InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                        </LightTooltip>}
                    slotProps={{ input: { startAdornment: <InputAdornment position="start">R$</InputAdornment>,}}}
                    error={!!errors.lastPrice}
                    disabled={!onEditing}
                    helperText={errors.lastPrice?.message}
                    value={formatCurrency(editingProductData?.lastPrice?.toString() ?? "")}
                    onChange={(e) => {
                        
                        const raw = e.target.value;
                        const numeric = raw.replace(/\D/g, ""); 
                        const value = Number(numeric) / 100; 
                        setEditingProductData({
                        ...editingProductData!,
                        lastPrice: Number(value),
                        });
                    }}
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
                    {...register("minStock")} 
                    error={!!errors.minStock}
                    disabled={!onEditing}
                    helperText={errors.minStock?.message}
                    value={editingProductData?.minStock}
                    onChange={(e)=> setEditingProductData({...editingProductData!, minStock: Number(e.target.value)})}
                    />
                </Grid>

                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>    
                    <FormControl fullWidth>
                        <InputLabel id="select-measurement">Unidade de medida</InputLabel>
                        <EditingSelect<ProductMeasurementType>
                        fullWidth
                        variant='outlined' 
                        label="Unidade de medida" 
                        labelId="select-measurement"
                        {...register("measurement")} 
                        onChange={(event)=> handleSelectChange(event.target.value as ProductMeasurementType, 'measurement')}
                        error={!!errors.measurement}
                        disabled={!onEditing}
                        value={editingProductData?.measurement ?? 'UN'}
                        required>
                            {ProductMeasurementTuple.map((unit) => <MenuItem key={unit} value={unit === null? '' : unit}>{unit} ({formatMeasurementUnit(unit)})</MenuItem>)}
                        </EditingSelect>
                    </FormControl>
                </Grid>
                
                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                    <FormControl fullWidth>
                        <InputLabel id="select-categoryId">Categoria</InputLabel>
                        <EditingSelect<string>
                        fullWidth
                        labelId='select-categoryId'
                        variant='outlined' 
                        MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                        }}
                        label="Categoria" 
                        {...register("categoryId")} 
                        onChange={(event)=> handleSelectChange(Number(event.target.value) as number, 'categoryId')}
                        error={!!errors.categoryId}
                        disabled={!onEditing}
                        value={String(editingProductData?.categoryId ?? '')}
                        >
                                <MenuItem value={''}><em>Selecione uma categoria</em></MenuItem>
                                {categories.map((category) => <MenuItem key={category.id} value={String(category.id)}>{category.name}</MenuItem>)}
                        </EditingSelect>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>
            <Typography color='secondary'><em>Criado em {formatTimestamp(editingProductData?.createdAt ?? '')}</em></Typography>
            <Divider orientation='vertical' flexItem/>
            <Typography color='secondary'><em>Última atualização em {formatTimestamp(editingProductData?.updatedAt ?? '')}</em></Typography>
    </Grid>
  )
}
