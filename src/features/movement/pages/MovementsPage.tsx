import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import SearchInput from '../../../shared/components/SearchInput/SearchInput'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, FilterAltRounded, SwapHorizRounded } from '@mui/icons-material'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import type { iMovementColumnConfig, MovementType } from '../../../shared/types/movement'
import { useMovementsQuery } from '../hooks/useMovementsQuery'
import MovementsFiltersSidebar from '../components/MovementsFiltersSidebar/MovementsFiltersSidebar'
import { movementsTableColumns } from '../helpers/movementsTableColumns'
import { persistMovementSearchFilter } from '../../../shared/utils/persistSearchFilter'

export type MovementsSearchFiltersProps = {
  orderBy?: 'asc' | 'desc';
  sortBy?:  'type' | 'createdAt' | 'userCreator';
  userId?: number | null
  type?: MovementType | null
  sentFrom?: number | null
  sentTo?: number | null
}

export default function MovementsPage() {
    const isFirstRender = useRef(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false)
    const [searchFilters, setSearchFilters] = useState<MovementsSearchFiltersProps>(
      sessionStorage.getItem('movementSearchFilters') ? 
        JSON.parse(sessionStorage.getItem('movementSearchFilters')!) : {
        orderBy: 'asc',
        sortBy: 'createdAt',
        type: null,
        sentFrom: null,
        sentTo: null,
        userId: null
    })

    const [searchResults, setSearchResults] = useState<(iMovementColumnConfig)[]>([])
    
    const { data, isLoading, error } = useMovementsQuery(page, rowsPerPage, searchValue, searchFilters)

    useEffect(()=>{
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            setPage(0)
            persistMovementSearchFilter(searchFilters)
        },[searchFilters])
    
    useEffect(() => {
    const movements = data?.data?.movements ?? [];

    setSearchResults(movements);
  }, [data]);

  useEffect(() => {
    console.log(searchFilters)
  }, [searchFilters])
    
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                  <SwapHorizRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Lista de Movimentações</Typography>
                    <Typography variant='body2'>Visualize a lista de movimentações registradas</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <Grid container spacing={2}>
                <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                    <SearchInput value={searchValue} valueSetter={setSearchValue} placeholder='Busque por estoques, usuários ou observações' />
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>setFilterMenuIsOpen(true)} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary' fullWidth>Filtrar movimentações <FilterAltRounded/></Button>
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='contained' fullWidth>Criar movimentação<AddCircleOutlineRounded/></Button>
                </Grid>
                </Grid>
                <ListingTable
                total={data?.data.pagination.total ?? searchResults.length}
                page={page} setPage={setPage} 
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                columns={movementsTableColumns} items={searchResults} 
                rowKey={(row: iMovementColumnConfig) => row.id} 
                onRowClick={(some)=> console.log(some)}/>
            </CardLayout>
            
        </Grid>
        <MovementsFiltersSidebar filters={searchFilters} setFiltersProps={setSearchFilters} open={filterMenuIsOpen} toggleDrawer={setFilterMenuIsOpen} />
    </Grid>
  )
}
