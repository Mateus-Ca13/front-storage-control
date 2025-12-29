
import { CenterFlexBox, StartColumnBox } from '../../../../shared/components/Boxes/Boxes';
import { Divider, MenuItem, Typography, useTheme } from '@mui/material';
import { useSettingsStore } from '../../stores/SettingsStore';
import { TwoColorsSwitch } from '../../../../shared/components/Switch/TwoColorsSwitch';
import { EditingSelect } from '../../../../shared/components/EditingSelect/EditingSelect';

export default function TablesSettingsSection() {
    const setSettings = useSettingsStore((state) => state.setSettings)
    const denseTables = useSettingsStore((state) => state.denseTables)
    const defaultPaginationRows = useSettingsStore((state) => state.defaultPaginationRows)
    const theme = useTheme()


  return (
    <StartColumnBox sx={{border: `1px solid ${theme.palette.primary.light}`, borderRadius: 1, p: 2, height: '100%', justifyContent: 'start'}}>
        <Typography color='primary' fontWeight={700} variant='h5'>Tabelas e paginação</Typography>
        <Divider orientation='horizontal' flexItem sx={{mt: 2, mb: 2}}/>
        <StartColumnBox mt={2}>
            <CenterFlexBox  width={'100%'}>
               <Typography marginRight={'auto'} fontWeight={700} variant='body1'>Tabelas densas</Typography>
               <Typography mr={1} variant='body1'>{denseTables ? 'Densas' : 'Padrão'}</Typography>
               <TwoColorsSwitch
                size='medium'
                colorDisabled='secondary'
                colorEnabled='primary'
                checked={denseTables === true}
                onChange={()=>{setSettings("denseTables", !denseTables);
                }}
                slotProps={{ input: { 'aria-label': 'controlled' } }}
                />
            </CenterFlexBox>
        </StartColumnBox>
        <StartColumnBox mt={2}>
            <CenterFlexBox  width={'100%'}>
               <Typography marginRight={'auto'} fontWeight={700} variant='body1'>Padrão de linhas por página</Typography>
               <EditingSelect
                    variant='outlined' 
                    value={defaultPaginationRows}
                    label="" 
                    onChange={(e)=>{setSettings("defaultPaginationRows", e.target.value);
                    }}
                    labelId="select-rowsPerPage"
                    required>
                        <MenuItem value={10}>
                            <Typography variant='body2'>10</Typography>
                        </MenuItem>
                        <MenuItem value={20}>
                            <Typography variant='body2'>20</Typography>
                        </MenuItem>
                        <MenuItem value={50}>
                            <Typography variant='body2'>50</Typography>
                        </MenuItem>
                        <MenuItem value={100}>
                            <Typography variant='body2'>100</Typography>
                        </MenuItem>
                    </EditingSelect>
            </CenterFlexBox>
        </StartColumnBox>
        
    </StartColumnBox>
    
  )
}
