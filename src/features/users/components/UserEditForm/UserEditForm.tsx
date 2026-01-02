import { useEffect, useState } from "react"
import { useConfirmActionDialogStore } from "../../../../shared/store/confirmActionDialogStore"
import { useToastStore } from "../../../../shared/store/toastStore"
import { UserRoleTuple, type iUser, type UserRoleType } from "../../../../shared/types/user"
import { userSchema, type UserSchema } from "../../../../schemas/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { deleteUserApi, updateUserApi } from "../../api/usersApi"
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Typography } from "@mui/material"
import { CenterFlexBox, StartColumnBox, StartFlexBox } from "../../../../shared/components/Boxes/Boxes"
import EditStateButton from "../../../../shared/components/EditStateButton/EditStateButton"
import { EditingTextField } from "../../../../shared/components/TextField/TextField"
import { EditingSelect } from "../../../../shared/components/EditingSelect/EditingSelect"
import { InfoOutlineRounded, LockOutlined, PeopleAlt } from "@mui/icons-material"
import { formatTimestamp, formatUserRole } from "../../../../shared/utils/formatters"
import { useUserStore } from "../../stores/useUserStore"
import { LightTooltip } from "../../../../shared/components/Tooltip/Tooltip"
import DeleteEntityButton from "../../../../shared/components/DeleteEntityButton/DeleteEntityButton"
import { useNavigate } from "react-router-dom"

type UserEditFormProps = {
    user: iUser | null    
}


export default function UserEditForm({user}: UserEditFormProps) {

    const navigate = useNavigate()
    const renderConfirmActionDialog = useConfirmActionDialogStore(state => state.renderConfirmActionDialog) 
    const closeConfirmActionDialog = useConfirmActionDialogStore(state => state.handleClose)
    const openChangePasswordDialog = useUserStore(state => state.openChangePasswordDialog)
    const renderToast = useToastStore(state => state.renderToast)
    const [editingUserData, setEditingUserData] = useState<iUser | null>(null)
    const [onEditing, setOnEditing] = useState<boolean>(false)
    const {register, handleSubmit, formState: { errors }} = useForm<UserSchema>({
            resolver: zodResolver(userSchema),
        });
    
        useEffect(() => {
            setEditingUserData(user)
        }, [user])

    const handleOnSubmit = async (userData: UserSchema) => {
        if(!user || !userData) return 
        
        renderConfirmActionDialog({
            title: 'Salvar alterações?',
            message: 'Você tem certeza que deseja salvar as alterações feitas neste usuário?',
            confirmAction: {label: 'Salvar', onClick: async () => {
                closeConfirmActionDialog()
                try{
                    let returnedData = await updateUserApi(user.id, userData);
                     if (returnedData.success){
                    renderToast({message: 'Edição de usuário concluída com sucesso!', type: 'success', })
                    console.log('Edição de usuário concluída com sucesso!', returnedData.data)
                }else{
                    renderToast({message: returnedData.message || 'Erro ao editar usuário', type: 'error', })
                    setEditingUserData(user)
                }
                }catch(error){
                    console.log(error)
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
        
        setEditingUserData({...editingUserData!, [prop]: null}) :
        setEditingUserData({...editingUserData!, [prop]: value}) 
    }

    const handleDeleteUser = async (userId: number) => {
        renderConfirmActionDialog({
        title: 'Excluir usuário?',
        message: 'Você tem certeza que deseja excluir este usuário? Essa ação não pode ser desfeita.',
        confirmAction: {label: 'Excluir', onClick: async () => {
            const returnedData = await deleteUserApi(userId)

            if(returnedData?.success) {
                closeConfirmActionDialog()
                renderToast({
                    type: 'success',
                    message: 'Usuário excluído com sucesso!'
                })
                navigate(-1)
            } else {
                closeConfirmActionDialog()
                renderToast({
                    type: 'error',
                    message: returnedData?.message?? 'Erro ao excluir usuário!'
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
                    <PeopleAlt color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Detalhes de Usuário</Typography>
                    <Typography variant='body2'>Visualize todas as informações a respeito do estoque</Typography>
                </StartColumnBox>
                </StartFlexBox>
            </Grid>
            <Grid container gap={2} size={{xl: 6, lg: 6, md:6, sm: 12, xs: 12}}>
                {!onEditing && <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                    <DeleteEntityButton
                    entityLabel='usuário'
                    onClick={() => handleDeleteUser(user!.id)}
                    />
                </Grid>
                }
                <EditStateButton
                state={onEditing} 
                setState={setOnEditing} 
                labelEntity='usuário' 
                cancelAction={() => setEditingUserData(user)} 
                confirmAction={() => handleOnSubmit(editingUserData as UserSchema)}/>
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
            value={editingUserData?.name}
            onChange={(e)=> setEditingUserData({...editingUserData!, name: e.target.value})}
            />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            sx={{ height: '100%'}} 
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth 
            variant='outlined'
            label="Usuário" 
            {...register("username")} 
            error={!!errors.username}
            disabled={!onEditing}
            helperText={errors.username?.message}
            value={editingUserData?.username}
            onChange={(e)=> setEditingUserData({...editingUserData!, username: e.target.value})}
            />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            sx={{ height: '100%'}} 
            slotProps={{ inputLabel: {shrink: true} }}
            fullWidth 
            variant='outlined'
            label="ID"  
            disabled
            value={editingUserData?.id}
            
            />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <FormControl fullWidth>
                <InputLabel shrink id="select-role">
                    <LightTooltip title='A função de um usuário define o escopo de ações que ele poderá realizar.'>
                    <CenterFlexBox gap={1}>Função <InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                    </LightTooltip>
                    </InputLabel>
                <EditingSelect
                fullWidth
                variant='outlined' 
                label="Função ..." 
                displayEmpty
                defaultValue=""
                sx={{"& .MuiInputBase-input.Mui-disabled": {WebkitTextFillColor: 'currentcolor'}}}
                labelId="select-role"
                {...register("role")} 
                onChange={(event)=> handleSelectChange(event.target.value as UserRoleType, 'role')}
                error={!!errors.role}
                disabled={!onEditing}
                value={editingUserData?.role ?? 'USER'}
                required>
                    {UserRoleTuple.map((role) => <MenuItem
                    key={role} 
                    value={role === null? '' : role}>
                        <Typography 
                        borderRadius={2}
                        width={'fit-content'}
                        px={2}
                        color={role === 'ADMIN'? 'info.dark' : role === 'USER'? 'success.dark' : 'warning.dark'}
                        bgcolor={role === 'ADMIN'? 'info.light' : role === 'USER'? 'success.light' : 'warning.light'}
                        >
                         {formatUserRole(role)}
                        </Typography>
                    </MenuItem>)}
                </EditingSelect>
            </FormControl>
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <EditingTextField
            sx={{ height: '100%'}} 
            slotProps={{ inputLabel: {shrink: true}}}
            fullWidth 
            variant='outlined'
            label="Email" 
            {...register("email")} 
            error={!!errors.email}
            disabled={!onEditing}
            helperText={errors.email?.message}
            value={editingUserData?.email}
            onChange={(e)=> setEditingUserData({...editingUserData!, email: e.target.value})}
            />
        </Grid>
        <Grid size={{lg: 4, md: 4, sm: 12, xs: 12}}>
            <Button disabled={!onEditing} sx={{height: '100%', padding: 1.5, textTransform: 'none', gap: 1, }} onClick={openChangePasswordDialog} variant="outlined" fullWidth>
                <Typography fontWeight={500}>Alterar senha</Typography>
                <LockOutlined fontSize="small"/>
            </Button>
        </Grid>
        <Typography color='secondary'><em>Criado em {formatTimestamp(editingUserData?.createdAt ?? '')}</em></Typography>
        <Divider orientation='vertical' flexItem/>
        <Typography color='secondary'><em>Última atualização em {formatTimestamp(editingUserData?.updatedAt ?? '')}</em></Typography>
    </Grid>
  )
}
