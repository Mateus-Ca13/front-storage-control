import { Grid, Typography } from '@mui/material'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { Settings } from '@mui/icons-material'
import ThemeSettingsSection from '../components/ThemeSettingsSection/ThemeSettingsSection'
import TablesSettingsSection from '../components/TablesSettingsSection/TablesSettingsSection'
import MovementsSettingsSection from '../components/MovementsSettingsSection/MovementsSettingsSection'
import NotificationSettingsSection from '../components/NotificationSettingsSection/NotificationSettingsSection'

export default function SettingsPage() {

  return (
        <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                    <Settings color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Configurações</Typography>
                    <Typography variant='body2'>Defina suas preferências e configurações gerais do sistema</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <Grid container spacing={4} mb={2}>
                    <Grid size={{xl: 4, lg: 4, md: 6, sm: 12, xs: 12}}>
                        <ThemeSettingsSection/>

                    </Grid>
                    <Grid size={{xl: 4, lg: 4, md: 6, sm: 12, xs: 12}}>
                        <TablesSettingsSection/>
                    </Grid>
                    <Grid size={{xl: 4, lg: 4, md: 6, sm: 12, xs: 12}}>
                        <MovementsSettingsSection/>
                    </Grid>
                    <Grid size={{xl: 4, lg: 4, md: 6, sm: 12, xs: 12}}>
                        <NotificationSettingsSection/>
                    </Grid>
                </Grid>
            </CardLayout>
            
        </Grid>
    </Grid>
  )
}
