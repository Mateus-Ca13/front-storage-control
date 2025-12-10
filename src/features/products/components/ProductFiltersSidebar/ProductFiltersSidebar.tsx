import { Button, Chip, Drawer, FormControl, InputLabel, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import type { ProductsSearchFiltersProps } from "../../pages/ProductsPage";
import { BetweenFlexBox, CenterFlexBox, StartColumnBox, StartFlexBox } from "../../../../shared/components/Boxes/Boxes";
import CheckboxOption from "../../../../shared/components/CheckboxOption/CheckboxOption";
import MultipleSelect from "../../../../shared/components/MultipleSelect/MultipleSelect";
import { useEffect, useState, type SetStateAction } from "react";
import { useCategoryQuery } from "../../../category/hooks/useCategoryQuery";
import { useStocksQuery } from "../../../stocks/hooks/useStocksQuery";
import { theme } from "../../../../theme/theme";
import { InfoOutlineRounded } from "@mui/icons-material";
import { LightTooltip } from "../../../../shared/components/Tooltip/Tooltip";

type ProductFiltersSidebarProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    filters: ProductsSearchFiltersProps
    setFiltersProps: React.Dispatch<SetStateAction<ProductsSearchFiltersProps>>
}
export default function ProductFiltersSidebar({open, toggleDrawer, filters, setFiltersProps}:ProductFiltersSidebarProps) {

    const [stocks, setStocks] = useState<{name: string, value: string | number}[]>([])
    const { data: stocksData, isLoading: stockIsLoading, error: stockError } = useStocksQuery(0, 100, '', {type: null})
    const [categories, setCategories] = useState<{name: string, value: string | number}[]>([])
    const { data: categoriesData, isLoading: categoriesIsLoading, error: categoriesError } = useCategoryQuery(0, 100, '', {orderBy: 'asc', sortBy: 'name'})

    useEffect(()=>{
        if(categoriesData?.data.categories){
            setCategories(categoriesData.data.categories.map((category)=>({name: category.name, value: category.id})))
        }
    },[categoriesData])

    useEffect(()=>{
        if(stocksData?.data.stocks){
            setStocks(stocksData.data.stocks.map((stock)=>({name: stock.name, value: stock.id})))
        }   
    },[stocksData])

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
                <Typography variant="body1" fontWeight={500}>Filtrar por Categorias</Typography>
                <MultipleSelect options={categories} selectedValueSetter={(value)=>setFiltersProps({...filters, categoriesIds: value})} selectedValues={filters.categoriesIds}/>
            </StartColumnBox>
            <StartColumnBox mt={4} gap={2}>
                <StartFlexBox gap={1}>
                <Typography variant="body1" fontWeight={500}>Filtrar por Estoque</Typography>
                <LightTooltip
                title='Quando selecionado, reflete apenas os produtos e quantidades no estoque selecionado'>
                    <InfoOutlineRounded  color='secondary' fontSize="small"/>
                </LightTooltip>
                </StartFlexBox>
                <FormControl
                 fullWidth>
                    <InputLabel id="stockLabel">Selecione o estoque</InputLabel>
                    <Select
                        label="Selecione o estoque"
                        
                        fullWidth
                        labelId="stockLabel"
                        id="stockId"
                        value={filters.stockId ?? ''}
                        onChange={(e)=>setFiltersProps({...filters, stockId: e.target.value? Number(e.target.value) : undefined})}
                        MenuProps={{
                            PaperProps: {
                                style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                            },
                        }}
                        >
                            <MenuItem
                            value={''}><em>Todos</em></MenuItem>
                            {stocks.map((stock)=>(
                            <MenuItem 
                            key={stock.value} value={stock.value}>{stock.name}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
            </StartColumnBox>
             <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por alertas</Typography>
                <CheckboxOption 
                checked={filters.isBelowMinStock}  
                label={'Apenas com estoque baixo'}
                propValueSetter={()=>setFiltersProps((prev) => ({...filters, isBelowMinStock: !prev.isBelowMinStock}))} />
                <CheckboxOption 
                checked={filters.hasNoCodebar}  
                label={'Apenas sem código de barras'}
                propValueSetter={()=>setFiltersProps((prev) => ({...filters, hasNoCodebar: !prev.hasNoCodebar}))} />
             </StartColumnBox>
            <Button variant="contained" sx={{ marginTop: 'auto', textTransform: 'none', padding: 2 }} fullWidth onClick={()=>{console.log(filters); toggleDrawer(false)}}>Confirmar filtros</Button>
        </StartColumnBox>
    </Drawer>
  )
}
