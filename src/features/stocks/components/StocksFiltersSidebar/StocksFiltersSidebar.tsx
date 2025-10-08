import { Button, Chip, Drawer, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { BetweenFlexBox, CenterFlexBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import CheckboxOption from "../../../../shared/components/CheckboxOption/CheckboxOption";
import type { SetStateAction } from "react";
import type { StocksSearchFiltersProps } from "../../pages/StocksPage";
import type { StockType } from "../../../../shared/types/stock";


type StocksFiltersSidebarProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    filters: StocksSearchFiltersProps
    setFiltersProps: React.Dispatch<SetStateAction<StocksSearchFiltersProps>>
}
export default function StockFiltersSidebar({open, toggleDrawer, filters, setFiltersProps}:StocksFiltersSidebarProps) {

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

                <CheckboxOption 
                checked={filters.sortBy === 'status'}
                label={'Status'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'status'})}/>

                <CheckboxOption 
                checked={filters.sortBy === 'type'}  
                label={'Tipo'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'type'})}/>

            </StartColumnBox>
             <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por tipo de estoque</Typography>
                <FormControl
                 fullWidth>
                    <InputLabel id="stocksTypeLabel">Selecione o tipo de estoque</InputLabel>
                    <Select
                    label="Selecione o tipo de estoque"
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                        }}
                    fullWidth
                    labelId="stocksTypeLabel"
                    id="stocksTypeId"
                    value={filters.type}
                    onChange={(e)=>setFiltersProps({...filters, type: e.target.value?.length! > 0 ? e.target.value as StockType  : null})}
                    >
                        <MenuItem value={''}><em>Todos</em></MenuItem>
                        <MenuItem value={'CENTRAL'}>Central</MenuItem>
                        <MenuItem value={'SECONDARY'}>Secundário</MenuItem>
                    </Select>
                </FormControl>
             </StartColumnBox>
            <Button variant="contained" sx={{ marginTop: 'auto', textTransform: 'none', padding: 2 }} fullWidth onClick={()=>{console.log(filters); toggleDrawer(false)}}>Confirmar filtros</Button>
        </StartColumnBox>
    </Drawer>
  )
}
