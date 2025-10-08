import { DeleteRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";


export const categoryMenuActions: ActionMenuOption[] = [
    {
        key: 'viewStock',
        label: 'Visualizar categoria',
        icon: <VisibilityRounded fontSize="small"/>,
        color: 'common',
        action: (id: number, navigate: NavigateFunction) => navigate(`/dashboard/categories/${id}`),
    },

    {
        key: 'deleteStock',
        label: 'Excluir categoria',
        icon: <DeleteRounded fontSize="small"/>,
        color: 'error',
        action: () => console.log('Excluir categoria'),
}
]