import { DeleteRounded, VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";
import { useConfirmActionDialogStore } from "../../../shared/store/confirmActionDialogStore";
import { useToastStore } from "../../../shared/store/toastStore";
import { deleteUserApi } from "../api/usersApi";
import { queryClient } from "../../../lib/reactQueryClient";


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
        action: (id: number, navigate: NavigateFunction) => {
        const renderConfirmActionDialog = useConfirmActionDialogStore.getState().renderConfirmActionDialog;
        const closeConfirmActionDialog = useConfirmActionDialogStore.getState().handleClose;
        const renderToast = useToastStore.getState().renderToast;

        renderConfirmActionDialog({
            title: 'Excluir usuário?',
            message: 'Você tem certeza que deseja excluir este usuário? Essa ação não pode ser desfeita.',
            confirmAction: {label: 'Excluir', onClick: async () => {
                const returnedData = await deleteUserApi(id)

                if(returnedData?.success) {
                    closeConfirmActionDialog()
                    renderToast({
                        type: 'success',
                        message: 'Usuário excluído com sucesso!'
                    })
                    queryClient.invalidateQueries({ queryKey: ['users'] });
                } else {
                    closeConfirmActionDialog()
                    renderToast({
                        type: 'error',
                        message: returnedData?.message?? 'Erro ao excluir usuário!'
                    })
                };
            }},
            cancelAction: {label: 'Cancelar', onClick: () => {
                closeConfirmActionDialog()
            }}
        })
            

    },
}
]