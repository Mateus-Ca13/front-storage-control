import { Button, Card, Grid, Typography } from '@mui/material'
import { CardLayout } from '../Cards/Cards'
import { CenterColumnBox } from '../Boxes/Boxes'
import { useNavigate } from 'react-router-dom'

export default function NotFoundedWarning() {
    const navigate = useNavigate()
    return (
        
        <CenterColumnBox sx={{mt: 10, width: '100%', height: '100%'}}>
            <Card sx={{ p:4, width: '50%', borderRadius: 2}}>
                <CenterColumnBox  gap={1}>
                    <Typography color='primary' fontWeight={700} variant='h3'>Página não encontrada</Typography>
                    <Typography variant='h6'>Parece que o que você está procurando não existe...</Typography>
                    <img style={{width: '24vw'}} src="/images/notFound.jpg" alt="404 - Página não encontrada" />
                    <Button variant='text' sx={{py: 1.5, px: 4, mt: 2}} onClick={()=>navigate(-1)}>
                        <Typography fontWeight={600} variant='body1'>Retornar à página anterior</Typography>
                    </Button>
                </CenterColumnBox>
            </Card>
        </CenterColumnBox>
    )
}
