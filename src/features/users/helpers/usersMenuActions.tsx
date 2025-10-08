import { DeleteRounded, EditRounded, VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";


export const usersMenuActions: ActionMenuOption[] = [
    {
        key: 'viewUser',
        label: 'Visualizar usuário',
        icon: <VisibilityRounded fontSize="small"/>,
        color: 'common',
        action: (id: number, navigate: NavigateFunction) => navigate(`/dashboard/users/${id}`),
    },
    {
        key: 'deleteUser',
        label: 'Excluir usuário',
        icon: <DeleteRounded fontSize="small"/>,
        color: 'error',
        action: () => console.log('Excluir usuário'),
}
]