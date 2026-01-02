import  { useEffect, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { Grid } from '@mui/material'
import UserEditForm from '../components/UserEditForm/UserEditForm'
import { useUserByIdQuery } from '../hooks/useUserByIdQuery'
import { useParams } from 'react-router-dom'
import ChangePasswordDialog from '../components/ChangePasswordDialog/ChangePasswordDialog'
import type { iUser } from '../../../shared/types/user'
import NotFoundedWarning from '../../../shared/components/NotFoundedWarning/NotFoundedWarning'
import LoadingOverlay from '../../../shared/components/LoadingOverlay/LoadingOverlay'

export default function UserViewPage() {
    const {id} = useParams()
    const [user, setUser] = useState<iUser | null>(null)
    const { data: userData, isLoading: userIsLoading } = useUserByIdQuery(Number(id))

    useEffect(() => {
        if(userData?.data){
            console.log(userData.data)
            setUser(userData.data)
            
        }
    }, [userData])



     
    if(userIsLoading) {return <LoadingOverlay/>}
    if(!userData?.success) {return <NotFoundedWarning/>}

    return (<Grid container size={{xl: 12, lg: 12, md: 12, sm: 12, xs: 12}} spacing={2}>
        <CardLayout sx={{padding: 2, width: '100%'}}>
                <UserEditForm user={user}/>
        </CardLayout>
        <Grid size={{xl: 12, lg: 21, md: 12, sm: 12, xs: 12}}>

        </Grid>
        <ChangePasswordDialog user={user}/>
    </Grid>)
                    
                

    
    
}
