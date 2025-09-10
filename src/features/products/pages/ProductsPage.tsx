import { Button, Chip, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import SearchInput from '../../../shared/components/SearchInput/SearchInput'
import { StartColumnBox } from '../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, FilterAltRounded } from '@mui/icons-material'
import ProductFiltersSidebar from '../components/ProductFiltersSidebar/ProductFiltersSidebar'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import type { ColumnConfig } from '../../../shared/types/columnConfig'
import type { iProductColumnConfig } from '../../../shared/types/product'
import { useProductsQuery } from '../hooks/useProductsQuery'
import { CategoryChip, TwoColorsChip } from '../../../shared/components/Chips/Chips'

export type SearchFiltersProps = {
  categoriesIds: string[];
  isBelowMinStock: boolean;
  orderBy?: 'asc' | 'desc';
  sortBy?: 'name' | 'categoryId' | 'stockedQuantities';
}

export default function ProductsPage() {
        
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false)
    const [searchFilters, setSearchFIlters] = useState<SearchFiltersProps>({
        categoriesIds: [],
        isBelowMinStock: false,
        orderBy: 'asc',
        sortBy: 'name'
    })
    const columns: ColumnConfig<iProductColumnConfig>[] = [
        { 
            key: 'id', 
            header: 'ID', 
            align: 'center', 
            minWidth: 20},
        { 
            key: 'name', 
            header: 'Nome', 
            align: 'left', 
            minWidth: 50 },
        { 
            key: 'category', 
            header: 'Categoria', 
            align: 'center', 
            minWidth: 30, 
            format: (value) => (value && typeof value === 'object') ? 
            <CategoryChip colorPreset={value.colorPreset} label={value.name}/> : 
            'Sem categoria'},
        { 
            key: 'stockedQuantities', 
            header: 'Quantidade em Estoque', 
            align: 'center', 
            minWidth: 30, 
            format: (value, product) => `${value} (${product?.measurement})`
        },
        { 
            key: 'isBelowMinStock', 
            header: 'Status', 
            align: 'center', 
            minWidth: 30, 
            format: (value, product) => !value ? 
            <TwoColorsChip colorPreset='success' label="Normal"/> :
            product?.stockedQuantities! > 0 ?
            <TwoColorsChip colorPreset='warning' label="Estoque baixo"/> :
            <TwoColorsChip colorPreset='error' label="Sem estoque"/>
        },
    ]

    const [searchResults, setSearchResults] = useState<(iProductColumnConfig)[]>([])
    
    const { data, isLoading, error } = useProductsQuery(page, rowsPerPage, searchValue, searchFilters)

    
    useEffect(()=>{
       setSearchResults(data?.data.products ?? [])
    }, [data, isLoading, error])
    

    
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartColumnBox mb={4}>
                <Typography color='primary' fontWeight={700} variant='h5'>Lista de Produtos</Typography>
                <Typography variant='body2'>Visualize a lista de produtos cadastrados</Typography>
                </StartColumnBox>
                <Grid container spacing={2}>
                <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                    <SearchInput value={searchValue} valueSetter={setSearchValue} placeholder='Busque por nome, categoria ou código de barras' />
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>setFilterMenuIsOpen(true)} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary' fullWidth>Filtrar produtos <FilterAltRounded/></Button>
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='contained' fullWidth>Criar produto <AddCircleOutlineRounded/></Button>
                </Grid>
                </Grid>
                <ListingTable
                total={data?.data.pagination.total ?? searchResults.length}
                page={page} setPage={setPage} 
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                columns={columns} items={searchResults} 
                rowKey={(row: iProductColumnConfig) => row.id} 
                onRowClick={(some)=> console.log(some)}/>
            </CardLayout>
            
        </Grid>
        <Button variant='outlined' onClick={()=> console.log(searchResults)}>Log de itens</Button>
        <ProductFiltersSidebar filters={searchFilters} setFiltersProps={setSearchFIlters} open={filterMenuIsOpen} toggleDrawer={setFilterMenuIsOpen} />
    </Grid>
  )
}
