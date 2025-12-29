

import React, { useEffect, useState } from 'react'
import { useConfirmActionDialogStore } from '../../../../shared/store/confirmActionDialogStore'
import { useToastStore } from '../../../../shared/store/toastStore'
import type { iCategory } from '../../../../shared/types/category'
import { categorySchema, type CategorySchema } from '../../../../schemas/categorySchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { deleteCategoryApi, updateCategoryApi } from '../../api/categoryApi'
import { Divider, FormControl, Grid, InputLabel, MenuItem, Typography, useTheme } from '@mui/material'
import EditStateButton from '../../../../shared/components/EditStateButton/EditStateButton'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { DiscountRounded } from '@mui/icons-material'
import { EndFlexBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { formatTimestamp } from '../../../../shared/utils/formatters'
import DeleteEntityButton from '../../../../shared/components/DeleteEntityButton/DeleteEntityButton'
import { useNavigate } from 'react-router-dom'

type CategoryEditFormProps = {
    category: iCategory | null
}


export default function CategoryEditForm({ category } : CategoryEditFormProps) {
    
    const navigate = useNavigate()
    const theme = useTheme()
    const renderConfirmActionDialog = useConfirmActionDialogStore(state => state.renderConfirmActionDialog) 
    const closeConfirmActionDialog = useConfirmActionDialogStore(state => state.handleClose)
    const renderToast = useToastStore(state => state.renderToast)
    const [editingCategoryData, setEditingCategoryData] = useState<iCategory | null>(null)
    const [onEditing, setOnEditing] = useState<boolean>(false)
    const {register, handleSubmit, formState: { errors, isSubmitting }, setError} = useForm<CategorySchema>({
            resolver: zodResolver(categorySchema),
        });


    const handleDeleteCategory = async (categoryId: number) => {
        renderConfirmActionDialog({
        title: 'Excluir categoria?',
        message: 'Você tem certeza que deseja excluir esta categoria? Essa ação não pode ser desfeita.',
        confirmAction: {label: 'Excluir', onClick: async () => {
            const returnedData = await deleteCategoryApi(categoryId)

            if(returnedData?.success) {
                closeConfirmActionDialog()
                renderToast({
                    type: 'success',
                    message: `Categoria excluída com sucesso! ${returnedData.data.updatedProductsCount} produto(s) foram desassociados.`
                })
                navigate(-1)
            } else {
                closeConfirmActionDialog()
                renderToast({
                    type: 'error',
                    message: returnedData?.message?? 'Erro ao excluir categoria!'
                })
            };
        }},
        cancelAction: {label: 'Cancelar', onClick: () => {
            closeConfirmActionDialog()
        }}
    })
    }
   
    
    useEffect(() => {
        setEditingCategoryData(category)
    }, [category])

    const handleOnSubmit = async (categoryData: CategorySchema) => {
            if(!category || !categoryData) return 
            
            renderConfirmActionDialog({
                title: 'Salvar alterações?',
                message: 'Você tem certeza que deseja salvar as alterações feitas nesta categoria?',
                confirmAction: {label: 'Salvar', onClick: async () => {
                    closeConfirmActionDialog()
                    let returnedData = await updateCategoryApi(category.id, categoryData);
                    if (returnedData.success){
                        renderToast({message: 'Edição de categoria concluída com sucesso!', type: 'success', })
                        console.log('Edição de categoria concluída com sucesso!', returnedData.data)
                    }else{
                        renderToast({message: returnedData.message || 'Erro ao editar categoria', type: 'error', })
                        setEditingCategoryData(category)
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
        
        setEditingCategoryData({...editingCategoryData!, [prop]: null}) :
        setEditingCategoryData({...editingCategoryData!, [prop]: value}) 
    }


  return (
    <Grid component={'form'} onSubmit={handleSubmit(handleOnSubmit)} container spacing={2} mb={2}>
        
        <Grid container justifyContent={'space-between'} mb={4} alignItems={'center'} size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}}>
            <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                <StartFlexBox gap={1}>
                    <DiscountRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                    <StartColumnBox>
                        <Typography color='primary' fontWeight={700} variant='h5'>Detalhes de Categoria</Typography>
                        <Typography variant='body2'>Visualize todas as informações a respeito da categoria</Typography>
                    </StartColumnBox>
                </StartFlexBox>
            </Grid>
            <Grid container gap={2} size={{xl: 6, lg:  6, md:  6, sm: 12, xs: 12}}>
                {!onEditing && <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <DeleteEntityButton
                    entityLabel='categoria'
                    onClick={() => handleDeleteCategory(category!.id)}
                    />
                </Grid>
                }
                <EditStateButton
                state={onEditing} 
                setState={setOnEditing} 
                labelEntity='categoria' 
                cancelAction={() => setEditingCategoryData(category)} 
                confirmAction={() => handleOnSubmit(editingCategoryData as CategorySchema)}/>
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
            value={editingCategoryData?.name}
            onChange={(e)=> setEditingCategoryData({...editingCategoryData!, name: e.target.value})}
            />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <FormControl fullWidth>
                <InputLabel id="select-color">Padrão de Cor</InputLabel>
                <EditingSelect
                fullWidth
                variant='outlined' 
                sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: 'currentcolor'}}}
                label="Padrão de Cor" 
                labelId="select-color"
                {...register("colorPreset")} 
                onChange={(event)=> handleSelectChange(event.target.value as number, 'colorPreset')}
                error={!!errors.colorPreset}
                disabled={!onEditing}
                value={editingCategoryData?.colorPreset ?? 1}
                required>
                    {Object.entries(theme.palette.categoryColors).map(([key, color], index) => 
                        <MenuItem key={key} value={index+1}>
                            <Typography width={'fit-content'} sx={{backgroundColor: color.light, color: color.dark, border: `1px solid ${color.main}`, borderRadius: 1, px: 2}} 
                            variant='body2'>
                                Padrão {index+1}
                            </Typography>
                        </MenuItem>
                    )}
                </EditingSelect>
            </FormControl>
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            type='number'
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth
            variant='outlined' 
            label="ID da Categoria" 
            disabled={true}
            value={editingCategoryData?.id}
            />
        </Grid>
        <Typography color='secondary'><em>Criado em {formatTimestamp(editingCategoryData?.createdAt ?? '')}</em></Typography>
        <Divider orientation='vertical' flexItem/>
        <Typography color='secondary'><em>Última atualização em {formatTimestamp(editingCategoryData?.updatedAt ?? '')}</em></Typography>
    </Grid>
  )
}
