import { Button, Chip, Drawer, Typography } from "@mui/material";
import type { SearchFiltersProps } from "../../pages/ProductsPage";
import { BetweenFlexBox, CenterFlexBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import CheckboxOption from "../../../../shared/components/CheckboxOption/CheckboxOption";
import MultipleSelect from "../../../../shared/components/MultipleSelect/MultipleSelect";
import type { SetStateAction } from "react";


type ProductFiltersSidebarProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    filters: SearchFiltersProps
    setFiltersProps: React.Dispatch<SetStateAction<SearchFiltersProps>>
}
export default function ProductFiltersSidebar({open, toggleDrawer, filters, setFiltersProps}:ProductFiltersSidebarProps) {

    const categories = [
        'Limpeza', 'Alimentos', 'Primeiro-socorros', 'Utilitários', 'Produtos de Limpeza', 'CXetremda', 'Cat1', 'Cat11', 'Cat10', 'Cat2', 'Cat3','LimCat4 peza', 'Cat5', 'Cat29-socorros', 'PCat55', 'Produtos _reCat44 Limpeza'
    ]

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
                checked={filters.sortBy === 'categoryId'}
                label={'Categoria'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'categoryId'})}/>

                <CheckboxOption 
                checked={filters.sortBy === 'stockedQuantities'}  
                label={'Quantidade'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'stockedQuantities'})}/>
            </StartColumnBox>
            <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por categoria</Typography>
                <MultipleSelect options={categories} selectedValueSetter={setFiltersProps} selectedValues={filters.categoriesIds}/>
            </StartColumnBox>
             <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por alerta</Typography>
                <CheckboxOption 
                checked={filters.isBelowMinStock}  
                label={'Apenas produtos com estoque baixo'}
                propValueSetter={()=>setFiltersProps((prev) => ({...filters, isBelowMinStock: !prev.isBelowMinStock}))} />
             </StartColumnBox>
            <Button variant="contained" sx={{ marginTop: 'auto', textTransform: 'none' }} fullWidth onClick={()=>{console.log(filters); toggleDrawer(false)}}>Confirmar filtros</Button>
        </StartColumnBox>
    </Drawer>
  )
}
