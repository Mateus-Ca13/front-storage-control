import React, { use, useEffect, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { Grid } from '@mui/material'
import UserEditForm from '../components/UserEditForm/UserEditForm'
import { useUserByIdQuery } from '../hooks/useUserByIdQuery'
import { useNavigate, useParams } from 'react-router-dom'
import type { iUser } from '../../auth/types/user'
import ChangePasswordDialog from '../components/ChangePasswordDialog/ChangePasswordDialog'

export default function UserViewPage() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState<iUser | null>(null)
    const {data, isLoading, error} = useUserByIdQuery(Number(id))

    useEffect(() => {
        if(data?.data){
            console.log(data.data)
            setUser(data.data)
            
        }
    }, [data])


  return (
    <Grid container size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} spacing={2}>
        <CardLayout sx={{padding: 2, width: '100%'}}>
                <UserEditForm user={user}/>
        </CardLayout>
        <Grid size={{xl: 12, lg: 21, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2, width: '100%',justifyContent: 'space-between', display: 'flex', flexDirection: 'column'}} >  
            </CardLayout>
        </Grid>
        <ChangePasswordDialog user={user}/>
    </Grid>
                    
                

    
            
  )
}
