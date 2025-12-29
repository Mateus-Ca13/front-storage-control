import { VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";

export const movementsMenuActions: ActionMenuOption[] = [
    {
        key: 'viewMovement',
        label: 'Visualizar movimentação',
        icon: <VisibilityRounded fontSize="small"/>,
        color: 'common',
        action: (id: number, navigate: NavigateFunction) => navigate(`/dashboard/movements/${id}`),
    },
    
]