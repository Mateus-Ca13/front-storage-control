import { Button, Grid, Typography } from "@mui/material";
import { CardLayout } from "../../../../shared/components/Cards/Cards";
import { CenterColumnBox, StartColumnBox } from "../../../../shared/components/Boxes/Boxes";
import { theme } from "../../../../theme/theme";
import MovementSummaryCard from "./MovementSummaryCard/MovementSummaryCard";
import type { MovementSummaryProps } from "../../types/movementSummary";
import { useNavigate } from "react-router-dom";


export default function MovementsSummaryPanel() {
    const navigate = useNavigate()

    const movements: MovementSummaryProps[] = [
        { id: 'MOV001', type: 'TRANSFER', originStockName: "CEAR", destinationStockName: "Restaurante", observations: 'Transferência de 100 unidades de produto A para produto B', createdAt: new Date('2023-04-01T12:00:00'), totalProducts: 100 },
        { id: 'MOV002', type: 'ENTRY', originStockName: null, destinationStockName: "CEAR", observations: 'Entrada de 50 unidades de produto B', createdAt: new Date('2023-04-02T12:00:00'), totalProducts: 50 },
        { id: 'MOV003', type: 'EXIT', originStockName: "CEAR", destinationStockName: null, observations: 'Saída de 25 unidades de produto A', createdAt: new Date('2023-04-03T12:00:00'), totalProducts: 25 },
    ];
  return (
    <Grid size={{xl: 6, lg:6, md: 12, sm: 12, xs: 12}}>
            <CardLayout sx={{ padding: 2, height: '100%'  }}>
                <StartColumnBox>
                    <Typography variant="h5" fontWeight={500} color={theme.palette.primary.main}>Movimentações recentes</Typography>
                    <Typography variant="body2">Últimas movimentações de estoque registradas</Typography>
                </StartColumnBox>
                <CenterColumnBox sx={{ gap: 2, mt: 3}}>
                    {movements.map((movement) => <MovementSummaryCard onClick={() =>navigate(`movements/${movement.id}`)} key={movement.id} {...movement}/>)}
                    <Button onClick={()=>navigate('movements')} fullWidth variant="outlined"sx={{p: 2}}>
                        <Typography sx={{textTransform: 'none'}} fontWeight={600} variant="body1">Ver todas as movimentações</Typography>
                    </Button>
                </CenterColumnBox>
            </CardLayout>
            
    </Grid>
    
    
  )
}
