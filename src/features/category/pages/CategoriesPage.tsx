import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import SearchInput from '../../../shared/components/SearchInput/SearchInput'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, DiscountRounded, FilterAltRounded } from '@mui/icons-material'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import { categoryTableColumns } from '../helpers/categoryTableColumns'
import type { iCategoryColumnConfig } from '../../../shared/types/category'
import { useCategoryQuery } from '../hooks/useCategoryQuery'
import CategoriesFiltersSidebar from '../components/CategoriesFiltersSidebar/CategoriesFiltersSidebar'
import { persistCategorySearchFilter } from '../../../shared/utils/persistSearchFilter'

export type CategoriesSearchFiltersProps = {
  orderBy?: 'asc' | 'desc';
  sortBy?: 'name'
}

export default function CategoriesPage() {
    const isFirstRender = useRef(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false)
    const [searchFilters, setSearchFilters] = useState<CategoriesSearchFiltersProps>(
        sessionStorage.getItem('categorySearchFilters') ? 
        JSON.parse(sessionStorage.getItem('categorySearchFilters')!) : 
        {
            orderBy: 'asc',
            sortBy: 'name',
        })

    const [searchResults, setSearchResults] = useState<(iCategoryColumnConfig)[]>([])
    
    const { data, isLoading, error } = useCategoryQuery(page, rowsPerPage, searchValue, searchFilters)
    
    useEffect(()=>{
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            setPage(0)
            persistCategorySearchFilter(searchFilters)
        },[searchFilters])

    useEffect(() => {
    const categories = data?.data?.categories ?? [];

    setSearchResults(categories);
  }, [data]);
    
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                    <DiscountRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Lista de Categorias</Typography>
                    <Typography variant='body2'>Visualize a lista de categorias cadastradas</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <Grid container spacing={2}>
                <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                    <SearchInput value={searchValue} valueSetter={setSearchValue} placeholder='Busque por nome de categoria' />
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>setFilterMenuIsOpen(true)} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary' fullWidth>Filtrar categorias <FilterAltRounded/></Button>
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='contained' fullWidth>Criar categoria<AddCircleOutlineRounded/></Button>
                </Grid>
                </Grid>
                <ListingTable
                total={data?.data.pagination.total ?? searchResults.length}
                page={page} setPage={setPage} 
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                columns={categoryTableColumns} items={searchResults} 
                rowKey={(row: iCategoryColumnConfig) => row.id} 
                onRowClick={(some)=> console.log(some)}/>
            </CardLayout>
            
        </Grid>
        <CategoriesFiltersSidebar filters={searchFilters} setFiltersProps={setSearchFilters} open={filterMenuIsOpen} toggleDrawer={setFilterMenuIsOpen} />
    </Grid>
  )
}
