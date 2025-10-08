import { Button, Chip, Drawer, Typography } from "@mui/material";
import { BetweenFlexBox, CenterFlexBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import CheckboxOption from "../../../../shared/components/CheckboxOption/CheckboxOption";
import type { SetStateAction } from "react";
import type { UsersSearchFiltersProps } from "../../pages/UserPage";


type UsersFiltersSidebarProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    filters: UsersSearchFiltersProps
    setFiltersProps: React.Dispatch<SetStateAction<UsersSearchFiltersProps>>
}
export default function UsersFiltersSidebar({open, toggleDrawer, filters, setFiltersProps}:UsersFiltersSidebarProps) {

  return (
    <Drawer 
    sx={{
        "& .MuiDrawer-paper": {
            width: 360, 
            overflowX: 'hidden',
            flexShrink: 0,
            boxSizing: "border-box",
            padding: 2
        },
    }} 
    anchor="right"  
    open={open} 
    onClose={() => toggleDrawer(false)}>
        <Typography color="primary" variant="h6">Filtrar usuários</Typography>
        <StartColumnBox sx={{ height: '100%'}} mt={8}>
            <BetweenFlexBox>
                    <Typography variant="body1" fontWeight={500}>Ordenar usuários por</Typography>
                    <CenterFlexBox gap={1}>
                        <Chip 
                        component={Button} 
                        onClick={()=>setFiltersProps({...filters, orderBy: "asc"})} 
                        variant={filters.orderBy === 'asc' ? 'filled' : 'outlined'} 
                        color="primary"
                        label="A-Z"/>
                        <Chip 
                        component={Button} 
                        onClick={()=>setFiltersProps({...filters, orderBy: "desc"})} 
                        variant={filters.orderBy === 'desc' ? 'filled' : 'outlined'} 
                        color="primary"
                        label="Z-A"/>
                    </CenterFlexBox>
            </BetweenFlexBox>
            <StartColumnBox mt={2}>
                <CheckboxOption 
                checked={filters.sortBy === 'name'}  
                label={'Nome'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'name'})} />
                <CheckboxOption 
                checked={filters.sortBy === 'role'}  
                label={'Função'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'role'})} />
            </StartColumnBox>
            <Button variant="contained" sx={{ marginTop: 'auto', textTransform: 'none', padding: 2 }} fullWidth onClick={()=>{console.log(filters); toggleDrawer(false)}}>Confirmar filtros</Button>
        </StartColumnBox>
    </Drawer>
  )
}
