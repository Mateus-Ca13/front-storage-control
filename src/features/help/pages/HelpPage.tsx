import { Grid, Typography } from '@mui/material'
import React from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { Help } from '@mui/icons-material'
import NavigationHelpSection from '../components/NavigationHelpSection/NavigationHelpSection'
import DataManipulationActionsSection from '../components/DataManipulationActionsSection/DataManipulationActionsSection'
import MovementsHelpSection from '../components/MovementsHelpSection/MovementsHelpSection'
import EntitiesHelpSection from '../components/EntitiesHelpSection/EntitiesHelpSection'

export default function HelpPage() {
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                    <Help color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Ajuda</Typography>
                    <Typography variant='body2'>Encontre respostas para suas perguntas e guias de uso</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <Grid container spacing={4} mb={2}>
                    <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                        <NavigationHelpSection/>
                    </Grid>
                    <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                        <EntitiesHelpSection/>
                    </Grid>
                    <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                        <DataManipulationActionsSection/>
                    </Grid>
                    <Grid size={{xl: 6, lg: 6, md: 6, sm: 12, xs: 12}}>
                        <MovementsHelpSection/>
                    </Grid>
                </Grid>
            </CardLayout>
            
        </Grid>
    </Grid>
    
  )
}
