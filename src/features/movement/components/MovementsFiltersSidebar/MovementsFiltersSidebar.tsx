import { Button, Chip, Drawer, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { BetweenFlexBox, CenterFlexBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import CheckboxOption from "../../../../shared/components/CheckboxOption/CheckboxOption";
import { useEffect, useState, type SetStateAction } from "react";
import type { MovementsSearchFiltersProps } from "../../pages/MovementsPage";
import type { MovementType } from "../../../../shared/types/movement";
import { useUsersQuery } from "../../../users/hooks/useUsersQuery";
import type { iUserColumnConfig } from "../../../../shared/types/user";
import type { iStockColumnConfig } from "../../../../shared/types/stock";
import { useStocksQuery } from "../../../stocks/hooks/useStocksQuery";


type MovementsFiltersSidebarProps = {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
    filters: MovementsSearchFiltersProps
    setFiltersProps: React.Dispatch<SetStateAction<MovementsSearchFiltersProps>>
}
export default function MovementsFiltersSidebar({open, toggleDrawer, filters, setFiltersProps}:MovementsFiltersSidebarProps) {

    const [users, setUsers] = useState<iUserColumnConfig[]>([])
    const [stocks, setStocks] = useState<iStockColumnConfig[]>([])

    const {data: usersData, isLoading: usersLoading, error: usersError} = useUsersQuery(0, 100, '', {orderBy: 'asc', sortBy: 'name'})
    const {data: stocksData, isLoading: stocksLoading, error: stocksError} = useStocksQuery(0, 100, '', {orderBy: 'asc', sortBy: 'name', type: null})

    useEffect(() => {
        const users = usersData?.data?.users ?? [];
        setUsers(users)

    }, [usersData]);

    useEffect(() => {
        const stocks = stocksData?.data?.stocks ?? [];
        setStocks(stocks)

    }, [stocksData]);



    

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
        <Typography color="primary" variant="h6">Filtrar movimentações</Typography>
        <StartColumnBox sx={{ height: '100%'}} mt={8}>
            <BetweenFlexBox>
                    <Typography variant="body1" fontWeight={500}>Ordenar movimentações por</Typography>
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
                checked={filters.sortBy === 'createdAt'}  
                label={'Data'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'createdAt'})} />

                <CheckboxOption 
                checked={filters.sortBy === 'type'}
                label={'Tipo'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'type'})}/>

                <CheckboxOption 
                checked={filters.sortBy === 'userCreator'}  
                label={'Usuário'}
                propValueSetter={()=>setFiltersProps({...filters, sortBy: 'userCreator'})}/>

            </StartColumnBox>
             <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por tipo de movimentação</Typography>
                <FormControl
                 fullWidth>
                    <InputLabel id="movementsTypeLabel">Selecione o tipo de movimentação</InputLabel>
                    <Select
                    label="Selecione o tipo de movimentação"
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                    }}
                    fullWidth
                    labelId="movementsTypeLabel"
                    id="movementsTypeId"
                    value={filters.type ?? ''}
                    onChange={(e)=>setFiltersProps({...filters, type: e.target.value?.length! > 0 ? e.target.value as MovementType  : null})}
                    >
                        <MenuItem value={''}><em>Todos</em></MenuItem>
                        <MenuItem value={'ENTRY'}>Entrada</MenuItem>
                        <MenuItem value={'EXIT'}>Saída</MenuItem>
                        <MenuItem value={'TRANSFER'}>Transferência</MenuItem>
                    </Select>
                </FormControl>
             </StartColumnBox>
             <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por usuário</Typography>
                <FormControl
                 fullWidth>
                    <InputLabel id="movementsUserLabel">Selecione o usuário</InputLabel>
                    <Select
                    label="Selecione o usuário"
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                        }}
                    fullWidth
                    labelId="movementsUserLabel"
                    id="movementsUserId"
                    value={filters.userId ?? ''}
                    onChange={(e)=>setFiltersProps({...filters, userId: e.target.value ? Number(e.target.value) as number  : null})}
                    >
                        <MenuItem value={''}><em>Todos</em></MenuItem>
                        {users && users.map((user)=> (<MenuItem value={user.id}>{user.name}</MenuItem>))}
                    </Select>
                </FormControl>
             </StartColumnBox>
             <StartColumnBox mt={4} gap={2}>
                <Typography variant="body1" fontWeight={500}>Filtrar por origem e destino</Typography>
                <CenterFlexBox gap={2} width={'100%'}>
                <FormControl
                 fullWidth>
                    <InputLabel id="movementsOriginStockLabel">Saiu de...</InputLabel>
                    <Select
                    label="Saiu de..."
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                    }}
                    fullWidth
                    labelId="movementsOriginStockLabel"
                    id="movementsOriginStockId"
                    value={filters.sentFrom ?? ''}
                    onChange={(e)=>setFiltersProps({...filters, sentFrom: e.target.value ? Number(e.target.value) as number  : null})}
                    >
                        <MenuItem value={''}><em>Todos</em></MenuItem>
                        {stocks && stocks.map((stock)=> (<MenuItem value={stock.id}>{stock.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <FormControl
                 fullWidth>
                    <InputLabel id="movementsDestinationStockLabel">Foi para...</InputLabel>
                    <Select
                    label="Foi para..."
                    MenuProps={{
                        PaperProps: {
                            style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                        },
                    }}
                    fullWidth
                    labelId="movementsDestinationStockLabel"
                    id="movementsDestinationStockId"
                    value={filters.sentTo ?? ''}
                    onChange={(e)=>setFiltersProps({...filters, sentTo: e.target.value ? Number(e.target.value) as number  : null})}
                    >
                        <MenuItem value={''}><em>Todos</em></MenuItem>
                        {stocks && stocks.map((stock)=> (<MenuItem value={stock.id}>{stock.name}</MenuItem>))}
                    </Select>
                </FormControl>
                </CenterFlexBox>
             </StartColumnBox>
            <Button variant="contained" sx={{ marginTop: 'auto', textTransform: 'none', padding: 2 }} fullWidth onClick={()=>{console.log(filters); toggleDrawer(false)}}>Confirmar filtros</Button>
        </StartColumnBox>
    </Drawer>
  )
}
