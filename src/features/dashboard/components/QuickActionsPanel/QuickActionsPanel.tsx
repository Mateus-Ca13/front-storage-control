import { Grid, Typography } from "@mui/material";
import { CardLayout } from "../../../../shared/components/Cards/Cards";
import QuickActionButton from "./QuickActionButton/QuickActionButton";
import { theme } from "../../../../theme/theme";
import { AddCircleRounded, DoDisturbOnRounded, CategoryRounded, SwapHorizontalCircleRounded } from "@mui/icons-material";
import type { QuickActionButtonProps } from "../../types/QuickActionButton";

export default function QuickActionsPanel() {

    const quickActions: QuickActionButtonProps[] = [
        { title: "Nova Entrada", action: ()=>{}, message: 'Registrar a entrada de produtos', color: theme.palette.success, icon: <AddCircleRounded fontSize="large"/> },
        { title: "Nova Saída", action: ()=>{}, message: 'Registrar a saída de produtos', color: theme.palette.error, icon: <DoDisturbOnRounded fontSize="large"/> },
        { title: "Nova Transferência", action: ()=>{}, message: 'Transferir produtos entre estoques', color: theme.palette.warning, icon: <SwapHorizontalCircleRounded fontSize="large"/> },
        { title: "Ver Produtos", action: ()=>{}, message: 'Ver todos os produtos', color: theme.palette.info, icon: <CategoryRounded fontSize="large"/>}
    ]

    return (
        <Grid size={{lg:12 , md: 12, sm: 12}}>
            <CardLayout sx={{ padding: 2}}>
                <Typography variant="h5" fontWeight={500} color={theme.palette.primary.main}>Ações rápidas</Typography>
                <Typography variant="body2">Acesse rapidamente as principais funcionalidades</Typography>
               
                <Grid container sx={{mt: 3}} spacing={2} alignItems="stretch">
                    {quickActions.map((action, index) => <Grid size={{xl: 3, lg:3, md: 6, sm: 12, xs: 12}}><QuickActionButton key={`quick-action-${index}`} {...action} /></Grid>)}
                </Grid> 
            </CardLayout>
        </Grid>
    
  )
}
