import { Button, Grid, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { CardLayout } from '../../../shared/components/Cards/Cards'
import SearchInput from '../../../shared/components/SearchInput/SearchInput'
import { StartColumnBox, StartFlexBox } from '../../../shared/components/Boxes/Boxes'
import { AddCircleOutlineRounded, FilterAltRounded, PeopleRounded } from '@mui/icons-material'
import ListingTable from '../../../shared/components/ListingTable/ListingTable'
import { useUsersQuery } from '../hooks/useUsersQuery'
import type { iUserColumnConfig } from '../../../shared/types/user'
import { usersTableColumns } from '../helpers/usersTableColumns'
import UsersFiltersSidebar from '../components/UsersFiltersSidebar/UsersFiltersSidebar'
import { persistUserSearchFilter } from '../../../shared/utils/persistSearchFilter'
import CreateUserDialog from '../components/CreateUserDialog/CreateUserDialog'
import { useUserStore } from '../stores/useUserStore'
import { useSettingsStore } from '../../settings/stores/SettingsStore'
import { useNavigate } from 'react-router-dom'


export type UsersSearchFiltersProps = {
  orderBy?: 'asc' | 'desc';
  sortBy?: 'name' | 'role';
}

export default function UsersPage() {
    const navigate = useNavigate()
    const defaultPaginationRows = useSettingsStore((state) => state.defaultPaginationRows);
    const openCreateModal = useUserStore((state) => state.openCreateModal)
    const isFirstRender = useRef(true);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(defaultPaginationRows);
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterMenuIsOpen, setFilterMenuIsOpen] = useState(false)
    const [searchFilters, setSearchFilters] = useState<UsersSearchFiltersProps>(
        sessionStorage.getItem('userSearchFilters') ? 
        JSON.parse(sessionStorage.getItem('userSearchFilters')!) : {
        orderBy: 'asc',
        sortBy: 'name',
    })

    const [searchResults, setSearchResults] = useState<(iUserColumnConfig)[]>([])
    
    const { data  } = useUsersQuery(page, rowsPerPage, searchValue, searchFilters)
    
    useEffect(()=>{
            if (isFirstRender.current) {
                isFirstRender.current = false;
                return;
            }
            setPage(0)
            persistUserSearchFilter(searchFilters)
        },[searchFilters])

    useEffect(() => {
    const users = data?.data?.users ?? [];

    setSearchResults(users);
  }, [data]);
    
  return (
    <Grid container spacing={2}>
        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{padding: 2}}>
                <StartFlexBox mb={4} gap={1}>
                    <PeopleRounded color='primary' sx={{fontSize: 48, backgroundColor: 'secondary.light', borderRadius: 1, p: 1}}/>
                <StartColumnBox>
                    <Typography color='primary' fontWeight={700} variant='h5'>Lista de Usuários</Typography>
                <Typography variant='body2'>Visualize a lista de usuários cadastrados</Typography>
                </StartColumnBox>
                </StartFlexBox>
                <StartColumnBox>
                </StartColumnBox>
                <Grid container spacing={2} mb={2}>
                <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                    <SearchInput value={searchValue} valueSetter={setSearchValue} placeholder='Busque por nome, usuário ou email' />
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button onClick={()=>setFilterMenuIsOpen(true)} size='large' sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='outlined' color='primary' fullWidth>Filtrar usuários<FilterAltRounded/></Button>
                </Grid>
                <Grid size={{lg: 3, md: 6, sm: 12, xs: 12}}>
                    <Button size='large' onClick={openCreateModal} sx={{ height: '100%', textTransform: 'none', gap: 1}} variant='contained' fullWidth>Criar usuário<AddCircleOutlineRounded/></Button>
                </Grid>
                </Grid>
                <ListingTable
                total={data?.data.pagination.total ?? searchResults.length}
                page={page} setPage={setPage} 
                rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} 
                columns={usersTableColumns} items={searchResults} 
                rowKey={(row: iUserColumnConfig) => row.id} 
                onRowClick={(some)=> navigate(`/dashboard/users/${some.id}`)}/>
            </CardLayout>
            
        </Grid>
        <CreateUserDialog/>
        <UsersFiltersSidebar filters={searchFilters} setFiltersProps={setSearchFilters} open={filterMenuIsOpen} toggleDrawer={setFilterMenuIsOpen} />
    </Grid>
  )
}
