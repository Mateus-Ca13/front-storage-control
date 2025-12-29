import { LockOutlined, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { useUserStore } from '../../stores/useUserStore'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema, userSchema, type PasswordSchema, type UserSchema } from '../../../../schemas/userSchema'
import { useForm } from 'react-hook-form'
import { useToastStore } from '../../../../shared/store/toastStore'
import { updateUserPasswordApi } from '../../api/usersApi'
import { StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import type { iUser } from '../../../../shared/types/user'

type UserEditFormProps = {
    user: iUser | null    
}



export default function ChangePasswordDialog({ user }: UserEditFormProps) {
    const open = useUserStore(state => state.changePasswordDialogIsVisible)
    const closeChangePasswordDialog = useUserStore(state => state.closeChangePasswordDialog)
    const renderToast = useToastStore(state => state.renderToast)
    const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false)
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState<boolean>(false)
    const [passwordData, setPasswordData] = useState<PasswordSchema | null>(null)
    const [editingUserData, setEditingUserData] = useState<iUser | null>(null)

    const {register, handleSubmit, formState: { errors, isSubmitting }, setError, reset: resetForm} = useForm<PasswordSchema>({
            resolver: zodResolver(passwordSchema),
        });

    const handleOnSubmit = async (passwordData: PasswordSchema) => {
        if  (!user || !passwordData) return 
        let returnedData = await updateUserPasswordApi(user.id, passwordData);
        if (returnedData.success){
            renderToast({message: 'Senha alterada com sucesso!', type: 'success', })
            closeChangePasswordDialog()
            setPasswordData({currentPassword: '', newPassword: ''})
            console.log('Senha alterada com sucesso!', returnedData.data)
        }else{
            if (returnedData.message === 'Senha atual inválida.') {
                debugger
                setError( 'currentPassword', {message: returnedData.message || 'Erro ao alterar senha.'})
            }else {
                setError( 'root', {message: returnedData.message || 'Erro ao alterar senha.'})
            }            
            setEditingUserData(user)
        }
    }

    const handleClose = () => {
        closeChangePasswordDialog()
        setPasswordData({currentPassword: '', newPassword: ''})
        resetForm()
    }


    useEffect(() => {
        setEditingUserData(user)
    }, [user])

  return (
    open &&
        <Dialog
        open={open} onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle pb={0} id="alert-dialog-title">
                <StartFlexBox gap={1}>
                    <LockOutlined sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                    <StartColumnBox>
                        <Typography variant='h6'>Alterar senha de usuário</Typography>
                        <Typography variant='body2'>Altere a senha de <strong>{user?.name}</strong></Typography>
                    </StartColumnBox>
                </StartFlexBox>
                </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <Grid container spacing={2} mb={2} mt={2}>
                    <EditingTextField
                    sx={{ height: '100%'}} 
                    slotProps={{ inputLabel: {shrink: true}, 
                    input: {endAdornment: 
                        <InputAdornment position="start">
                            <div style={{cursor: 'pointer'}}onClick={()=> setCurrentPasswordVisible(!currentPasswordVisible)} >
                                {currentPasswordVisible? <VisibilityOffRounded/> : <VisibilityRounded/>}
                            </div>
                        </InputAdornment>} }}
                    fullWidth 
                    type={currentPasswordVisible? 'text' : 'password'}
                    variant='outlined'
                    label="Senha atual" 
                    placeholder='Senha atual do usuário...'
                    {...register("currentPassword")} 
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                    value={passwordData?.currentPassword}
                    onChange={(e)=> setPasswordData({...passwordData!, currentPassword: e.target.value})}
                    />
                    <EditingTextField
                    sx={{ height: '100%'}} 
                    slotProps={{ inputLabel: {shrink: true}, 
                    input: {endAdornment: 
                        <InputAdornment position="start">
                            <div style={{cursor: 'pointer'}}onClick={()=> setNewPasswordVisible(!newPasswordVisible)} >
                                {newPasswordVisible? <VisibilityOffRounded/> : <VisibilityRounded/>}
                            </div>
                        </InputAdornment>} }}
                    fullWidth 
                    type={newPasswordVisible? 'text' : 'password'}
                    variant='outlined'
                    label="Nova senha" 
                    {...register("newPassword")} 
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    value={passwordData?.newPassword}
                    placeholder='Nova senha do usuário...'
                    onChange={(e)=> setPasswordData({...passwordData!, newPassword: e.target.value})}
                    />
                    {errors.root && (
                    <Alert severity="error">{errors.root.message}</Alert>
                    )}
                </Grid>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} variant='text'>Cancelar</Button>
            <Button onClick={handleSubmit(handleOnSubmit)} variant='text'>Alterar senha</Button>
            </DialogActions>
        </Dialog>

  )
}
