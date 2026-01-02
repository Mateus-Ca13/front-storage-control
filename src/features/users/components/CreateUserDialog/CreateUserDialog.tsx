import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, Typography } from '@mui/material'
import { EditingTextField } from '../../../../shared/components/TextField/TextField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect'
import { formatUserRole } from '../../../../shared/utils/formatters'
import { BorderColor, InfoOutlineRounded, VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import {  CenterFlexBox, StartColumnBox, StartFlexBox } from '../../../../shared/components/Boxes/Boxes'
import { useToastStore } from '../../../../shared/store/toastStore'
import { useUserStore } from '../../stores/useUserStore'
import { createUserDTO, type CreateUserDTO } from '../../../../schemas/userSchema'
import { createUserApi } from '../../api/usersApi'
import { useState } from 'react'
import { LightTooltip } from '../../../../shared/components/Tooltip/Tooltip'
import { UserRoleTuple } from '../../../../shared/types/user'
import { queryClient } from '../../../../lib/reactQueryClient'

export default function CreateUserDialog() {

  const renderToast = useToastStore(state => state.renderToast)
  const isCreateModalOpen = useUserStore(state => state.isCreateModalOpen)
  const closeCreateModal = useUserStore(state => state.closeCreateModal)
  const {register, handleSubmit, formState: { errors }, reset: resetForm} = useForm<CreateUserDTO>({
          resolver: zodResolver(createUserDTO),
          defaultValues: {

          }
          
      });
  const [newPasswordVisible, setNewPasswordVisible] = useState<boolean>(false)
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState<boolean>(false)
  
      const handleOnSubmit = async (userData: CreateUserDTO) => {
          console.log(userData)
          const returnedData = await createUserApi(userData);
          if (returnedData.success){
              renderToast({message: 'Usuário criado com sucesso!', type: 'success', })
              console.log('Usuário criado com sucesso!', returnedData.data)
              handleCloseDialog()
              queryClient.invalidateQueries({ queryKey: ['users'] });
          }else{
              renderToast({message: returnedData.message || 'Erro ao criar usuário', type: 'error', })
          }
      }

  const handleCloseDialog = () => {
    closeCreateModal()
    resetForm({
        name: '',
        email: '',
        username: '',
        role: 'USER',
        password: '',
        confirmPassword: ''
    });
    setNewPasswordVisible(false);
    setCurrentPasswordVisible(false);
  }


  return (
    isCreateModalOpen && <Dialog
      maxWidth='sm'
      fullWidth
      open={isCreateModalOpen}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <StartFlexBox gap={1}>
            <BorderColor color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
            <StartColumnBox>
              <Typography fontWeight={700} variant='h5'>Criar novo usuário</Typography>
              <Typography variant='body2'>Preencha os dados para criar um novo usuário</Typography>
            </StartColumnBox>
          </StartFlexBox>
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2} mb={2} mt={2}>
              <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
                <EditingTextField
                sx={{ height: '100%'}} 
                slotProps={{ inputLabel: {shrink: true} }}
                fullWidth 
                variant='outlined'
                label="Nome completo" 
                placeholder='Nome completo'
                {...register("name")} 
                error={!!errors.name}
                helperText={errors.name?.message}
                />
              </Grid>
              <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
                <EditingTextField
                sx={{ height: '100%'}} 
                slotProps={{ inputLabel: {shrink: true} }}
                fullWidth 
                variant='outlined'
                label="E-mail" 
                placeholder='E-mail'
                {...register("email")} 
                error={!!errors.email}
                helperText={errors.email?.message}
                />
              </Grid>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <EditingTextField
                slotProps={{ inputLabel: {shrink: true}}}
                fullWidth
                variant='outlined' 
                label='Usuário' 
                placeholder='Nome de usuário'
                {...register("username")} 
                error={!!errors.username}
                helperText={errors.username?.message}
                />
            </Grid>
            <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>    
                <FormControl fullWidth>
                  <InputLabel shrink id="select-role">
                    <LightTooltip title='A função de um usuário define o escopo de ações que ele poderá realizar.'>
                    <CenterFlexBox gap={1}>Função <InfoOutlineRounded fontSize='small'/></CenterFlexBox>
                  </LightTooltip>
                  </InputLabel>
                  <EditingSelect
                  fullWidth
                  variant='outlined' 
                  label={'Função ...'}
                  displayEmpty
                  defaultValue=""
                  labelId="select-role"
                  {...register("role")}  
                  error={!!errors.role}
                  required>
                      {UserRoleTuple.map((role) => <MenuItem key={role} value={role === null? '' : role}>{formatUserRole(role)}</MenuItem>)}
                  </EditingSelect>
                  {errors.role && (
                    <FormHelperText error>{errors.role.message}</FormHelperText>
                  )}
                </FormControl>
            </Grid>
            <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
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
              label="Senha" 
              placeholder='Senha do usuário'
              {...register("password")} 
              error={!!errors.password}
              helperText={errors.password?.message}
              />
            </Grid>
            <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
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
              label="Confirmar senha" 
              {...register("confirmPassword")} 
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              placeholder='Confirmar senha de usuário'
              />
              {errors.root && (
              <Alert severity="error">{errors.root.message}</Alert>
              )}
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
