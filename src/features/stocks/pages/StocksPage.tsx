import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import SearchInput from '../../../shared/components/SearchInput/SearchInput'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, FilterAltRounded, WarehouseRounded } from '@mui/icons-material'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import type { iStockColumnConfig, StockType } from '../../../shared/types/stock'
import { useStocksQuery } from '../hooks/useStocksQuery'
import { stocksTableColumns } from '../helpers/stocksTableColumns'
import StockFiltersSidebar from '../components/StocksFiltersSidebar/StocksFiltersSidebar'
import { persistStockSearchFilter } from '../../../shared/utils/persistSearchFilter'
import { useStockStore } from '../stores/useStockStore'
import CreateStockDialog from '../components/CreateStockDialog/CreateStockDialog'

export type StocksSearchFiltersProps = {
  orderBy?: 'asc' | 'desc';
  sortBy?: 'name' | 'status' | 'type' ;
  type: StockType | null
}

export default function StocksPage() {
    const openCreateModal = useStockStore((state) => state.openCreateModal)
    const isFirstRender = useRef(true)
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false)
    const [searchFilters, setSearchFilters] = useState<StocksSearchFiltersProps>(
        sessionStorage.getItem('stockSearchFilters') ? 
        JSON.parse(sessionStorage.getItem('stockSearchFilters')!) : {
        orderBy: 'asc',
        sortBy: 'name',
        type: null
    })

    const [searchResults, setSearchResults] = useState<(iStockColumnConfig)[]>([])
    
    const { data, isLoading, error } = useStocksQuery(page, rowsPerPage, searchValue, searchFilters)
    
    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        setPage(0)
        persistStockSearchFilter(searchFilters)
    },[searchFilters])


    useEffect(() => {
    const stocks = data?.data?.stocks ?? [];
    
    setSearchResults(stocks);
  }, [data]);
    
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                    <WarehouseRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Lista de Estoques</Typography>
                    <Typography variant='body2'>Visualize a lista de estoques cadastrados</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <Grid container spacing={2} mb={2}>
                <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                    <SearchInput value={searchValue} valueSetter={setSearchValue} placeholder='Busque por nome de estoque' />
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>setFilterMenuIsOpen(true)} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary' fullWidth>Filtrar estoques <FilterAltRounded/></Button>
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' onClick={()=>openCreateModal()} sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='contained' fullWidth>Criar estoque<AddCircleOutlineRounded/></Button>
                </Grid>
                </Grid>
                <ListingTable
                total={data?.data.pagination.total ?? searchResults.length}
                page={page} setPage={setPage} 
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                columns={stocksTableColumns} items={searchResults} 
                rowKey={(row: iStockColumnConfig) => row.id} 
                onRowClick={(some)=> console.log(some)}/>
            </CardLayout>
            
        </Grid>
        <CreateStockDialog/>
        <StockFiltersSidebar filters={searchFilters} setFiltersProps={setSearchFilters} open={filterMenuIsOpen} toggleDrawer={setFilterMenuIsOpen} />
    </Grid>
  )
}
