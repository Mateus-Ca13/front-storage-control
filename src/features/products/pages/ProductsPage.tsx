import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import SearchInput from '../../../shared/components/SearchInput/SearchInput'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, Category, FilterAltRounded } from '@mui/icons-material'
import ProductFiltersSidebar from '../components/ProductFiltersSidebar/ProductFiltersSidebar'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import type { iProductColumnConfig } from '../../../shared/types/product'
import { useProductsQuery } from '../hooks/useProductsQuery'
import { productsTableColumns } from '../helpers/productsTableColumns'
import { persistProductSearchFilter } from '../../../shared/utils/persistSearchFilter'
import CreateProductDialog from '../components/CreateProductDialog/CreateProductDialog'
import { useProductStore } from '../stores/useProductStore'
import ImportProductsDialog from '../components/ImportProductsDialog/ImportProductsDialog'
import { useSettingsStore } from '../../settings/stores/SettingsStore'
import { useNavigate } from 'react-router-dom'

export type ProductsSearchFiltersProps = {
  stockId?: number;  
  categoriesIds: string[];
  isBelowMinStock: boolean;
  orderBy?: 'asc' | 'desc';
  sortBy?: 'name' | 'categoryId' | 'stockedQuantities';
  hasNoCodebar: boolean;
}

export default function ProductsPage() {
    const navigate = useNavigate()
    const defaultPaginationRows = useSettingsStore((state) => state.defaultPaginationRows);
    const openCreateModal = useProductStore((state) => state.openCreateModal)
    const isFirstRender = useRef(true);   
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginationRows);
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false)
    const [searchFilters, setSearchFilters] = useState<ProductsSearchFiltersProps>(
        sessionStorage.getItem('productSearchFilters') ? 
        JSON.parse(sessionStorage.getItem('productSearchFilters')!) : 
        {
        categoriesIds: [],
        isBelowMinStock: false,
        orderBy: 'asc',
        sortBy: 'name',
        hasNoCodebar: false,
        stockId: undefined
    })
    

    useEffect(()=>{

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setPage(0)
        persistProductSearchFilter(searchFilters)
    },[searchFilters])

    const [searchResults, setSearchResults] = useState<(iProductColumnConfig)[]>([])
    
    const { data, isLoading, error } = useProductsQuery(page, rowsPerPage, searchValue, searchFilters)

    
    useEffect(() => {
    const products = data?.data?.products ?? [];

    
    setSearchResults(products);
  }, [data]);
    
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                    <Category color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Lista de Produtos</Typography>
                    <Typography variant='body2'>Visualize a lista de produtos cadastrados</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <Grid container spacing={2} mb={2}>
                <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                    <SearchInput value={searchValue} valueSetter={setSearchValue} placeholder='Busque por nome, descrição ou código de barras' />
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>setFilterMenuIsOpen(true)} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary' fullWidth>Filtrar produtos <FilterAltRounded/></Button>
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>openCreateModal()} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='contained' fullWidth>Criar produto<AddCircleOutlineRounded/></Button>
                </Grid>
                </Grid>
                <ListingTable
                total={data?.data.pagination.total ?? searchResults.length}
                page={page} setPage={setPage} 
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                columns={productsTableColumns} items={searchResults} 
                rowKey={(row: iProductColumnConfig) => row.id} 
                onRowClick={(some)=> navigate(`/dashboard/products/${some.id}`)}/>
            </CardLayout>
            
        </Grid>
        <CreateProductDialog/>
        <ImportProductsDialog/>
        <ProductFiltersSidebar filters={searchFilters} setFiltersProps={setSearchFilters} open={filterMenuIsOpen} toggleDrawer={setFilterMenuIsOpen} />
    </Grid>
  )
}
