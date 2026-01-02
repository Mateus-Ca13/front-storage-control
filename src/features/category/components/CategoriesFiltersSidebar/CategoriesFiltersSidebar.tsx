import { Button, Chip, Drawer, Typography } from "@mui/material";
import { BetweenFlexBox, CenterFlexBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import CheckboxOption from "../../../../shared/components/CheckboxOption/CheckboxOption";
import type { SetStateAction } from "react";
import type { CategoriesSearchFiltersProps } from "../../pages/CategoriesPage";


type CategoriesFiltersSidebarProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    filters: CategoriesSearchFiltersProps
    setFiltersProps: React.Dispatch<SetStateAction<CategoriesSearchFiltersProps>>
}
export default function CategoriesFiltersSidebar({open, toggleDrawer, filters, setFiltersProps}:CategoriesFiltersSidebarProps) {

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
        <Typography color="primary" variant="h6">Filtrar produtos</Typography>
        <StartColumnBox sx={{ height: '100%'}} mt={8}>
            <BetweenFlexBox>
                    <Typography variant="body1" fontWeight={500}>Ordenar produtos por</Typography>
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
            </StartColumnBox>
            <Button variant="contained" sx={{ marginTop: 'auto', textTransform: 'none', padding: 2 }} fullWidth onClick={()=>{console.log(filters); toggleDrawer(false)}}>Confirmar filtros</Button>
        </StartColumnBox>
    </Drawer>
  )
}
