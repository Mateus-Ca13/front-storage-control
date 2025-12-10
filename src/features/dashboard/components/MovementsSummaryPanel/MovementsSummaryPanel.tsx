import { Button, Grid, Typography } from "@mui/material";
import { CardLayout } from "../../../../shared/components/Cards/Cards";
import { CenterColumnBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import { theme } from "../../../../theme/theme";
import MovementSummaryCard from "./MovementSummaryCard/MovementSummaryCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMovementsQuery } from "../../../movement/hooks/useMovementsQuery";
import type { iMovementColumnConfig } from "../../../../shared/types/movement";


export default function MovementsSummaryPanel() {
    const navigate = useNavigate()

    const [movements, setMovements] = useState<iMovementColumnConfig[]>([])

    const { data, isLoading, error } = useMovementsQuery(0, 5, '', {orderBy: 'desc', sortBy: 'createdAt'})

    useEffect(() => {
        const movements = data?.data?.movements ?? [];
    
        setMovements(movements);
      }, [data]);



  return (
    <Grid size={{xl: 6, lg:6, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{ padding: 2, height: '100%'  }}>
                <StartColumnBox>
                    <Typography variant="h5" fontWeight={500} color={theme.palette.primary.main}>Movimentações recentes</Typography>
                    <Typography variant="body2">Últimas movimentações de estoque registradas</Typography>
                </StartColumnBox>
                <CenterColumnBox sx={{ gap: 2, mt: 3}}>
                    {movements.map((movement) => <MovementSummaryCard onClick={() =>navigate(`movements/${movement.id}`)} key={movement.id} {...movement}/>)}
                    <Button onClick={()=>navigate('/dashboard/movements')} fullWidth variant="outlined"sx={{p: 2}}>
                        <Typography sx={{textTransform: 'none'}} fontWeight={600} variant="body1">Ver todas as movimentações</Typography>
                    </Button>
                </CenterColumnBox>
            </CardLayout>
            
    </Grid>
    
    
  )
}
