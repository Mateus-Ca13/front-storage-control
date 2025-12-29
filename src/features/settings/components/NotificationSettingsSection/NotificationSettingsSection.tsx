import { CenterFlexBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes'
import { Divider, Typography, useTheme } from '@mui/material'
import { useSettingsStore } from '../../stores/SettingsStore'
import { TwoColorsSwitch } from '../../../../shared/components/Switch/TwoColorsSwitch'

export default function NotificationSettingsSection() {
    const setSettings = useSettingsStore((state) => state.setSettings)
    const audioFeedback = useSettingsStore((state) => state.audioFeedback)
    const theme = useTheme()

    return (
        <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
            <Typography color='primary' fontWeight={700} variant='h5'>Notificações e áudio</Typography>
            <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
            <StartColumnBox mt={2}>
                <CenterFlexBox gap={2}  width={'100%'}>
                    <Typography mr={'auto'} fontWeight={700} variant='body1'>Avisos sonoros</Typography>
                    <Typography mr={1} variant='body1'>{audioFeedback  ? 'Ligado' : 'Desligado'}</Typography>
                    <TwoColorsSwitch
                    size='medium'
                    colorDisabled='secondary'
                    colorEnabled='primary'
                    checked={audioFeedback === true}
                    onChange={()=>{setSettings("audioFeedback", !audioFeedback);
                    }}
                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                    />
                </CenterFlexBox>
            </StartColumnBox>
        </StartColumnBox>
    )
}
