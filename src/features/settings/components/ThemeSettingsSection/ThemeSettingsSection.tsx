import { Box, Divider, Typography, useTheme } from '@mui/material'
import { CenterFlexBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { useSettingsStore } from '../../stores/SettingsStore'
import { ThemeSwitch } from '../../../../shared/components/Switch/ThemeSwitch';
import { TwoColorsSwitch } from '../../../../shared/components/Switch/TwoColorsSwitch';
import { LightTooltip } from '../../../../shared/components/Tooltip/Tooltip';

export default function ThemeSettingsSection() {

    const setSettings = useSettingsStore((state) => state.setSettings)
    const AppTheme = useSettingsStore((state) => state.theme)
    const simplifiedInterface = useSettingsStore((state) => state.simplifiedInterface)
    const theme = useTheme()

  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Tema e UI</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox mt={2}>
            <CenterFlexBox  width={'100%'}>
               <Typography marginRight={'auto'} fontWeight={700} variant='body1'>Tema padrão</Typography>
               <Typography mr={1} variant='body1'>{AppTheme === 'light' ? 'Claro' : 'Escuro'}</Typography>
               <ThemeSwitch
                currentTheme={AppTheme}
                checked={AppTheme === 'dark'}
                onChange={()=>{setSettings("theme", AppTheme === 'light' ? 'dark' : 'light');
                }}
                slotProps={{ input: { 'aria-label': 'controlled' } }}
                />
                
            </CenterFlexBox>
        </StartColumnBox>
        <StartColumnBox mt={2}>
            <CenterFlexBox width={'100%'}>
                <Typography marginRight={'auto'} fontWeight={700} variant='body1'>Composição de interface</Typography>
                <Typography mr={1} variant='body1'>{simplifiedInterface  ? 'Simplificada' : 'Padrão'}</Typography>
                <LightTooltip title="Em desenvolvimento ⚠️">
                    <Box>
                        <TwoColorsSwitch
                        disabled
                        size='medium'
                        colorDisabled='secondary'
                        colorEnabled='primary'
                        checked={simplifiedInterface === true}
                        onChange={()=>{setSettings("simplifiedInterface", !simplifiedInterface);
                        }}
                        slotProps={{ input: { 'aria-label': 'controlled' } }}
                        />
                    </Box>
                </LightTooltip>
            </CenterFlexBox>
        </StartColumnBox>
    </StartColumnBox>
  )
}
