import React from 'react'
import { CenterColumnBox, CenterFlexBox } from '../../../../../shared/components/Boxes/Boxes'
import { Button, InputAdornment, Tab, Tabs, Typography } from '@mui/material'
import { FileUploadOutlined, SearchRounded } from '@mui/icons-material'
import { EditingTextField } from '../../../../../shared/components/TextField/TextField'
import CustomTabPanel from '../../../../../shared/components/CustomTabPanel/CustomTabPanel'

export default function ImportNfeTab() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    function a11yProps(index: number) {
        return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        };
    }

return (
    <CenterColumnBox width={'100%'}>
        <Typography fontWeight={600} variant='h6'>Importar NF-e</Typography>
        <Tabs sx={{width: '100%'}} value={value} onChange={handleChange}>
            <Tab sx={{width: '50%'}}  label="Imagem / QR Code" {...a11yProps(0)} />
            <Tab sx={{width: '50%'}} label="Chave de acesso" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
            <Button
            fullWidth
            variant='contained'>
                <CenterFlexBox py={1.5} gap={1}>
                <Typography variant='body2'>
                Importar NF-e
                </Typography>
                <FileUploadOutlined fontSize={'small'}/>
                </CenterFlexBox>
            </Button>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <EditingTextField
            sx={{ height: '100%'}} 
            slotProps={{ inputLabel: {shrink: true}, input: { endAdornment: 
            <InputAdornment position="end">
            <Button
            variant='contained'
            sx={{textTransform: 'none'}}
            >
                <SearchRounded/>    
            </Button>
            </InputAdornment>} }}
            fullWidth 
            onChange={(e)=>{
                const value = e.target.value.replace(/\D/g, '');
                e.target.value = value
            }}
            variant='outlined'
            label="Chave de acesso" 
            placeholder='Chave de acesso da NF-e...'
            />  
        </CustomTabPanel>
                    
                  
    </CenterColumnBox>
  )
}
