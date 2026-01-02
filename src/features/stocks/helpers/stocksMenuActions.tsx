import { DeleteRounded, VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";
import { useConfirmActionDialogStore } from "../../../shared/store/confirmActionDialogStore";
import { useToastStore } from "../../../shared/store/toastStore";
import { deleteStockApi } from "../api/stocksApi";
import { queryClient } from "../../../lib/reactQueryClient";


export const stocksMenuActions: ActionMenuOption[] = [
    {
        key: 'viewStock',
        label: 'Visualizar estoque',
        icon: <VisibilityRounded fontSize="small"/>,
        color: 'common',
        action: (id: number, navigate: NavigateFunction) => navigate(`/dashboard/stocks/${id}`)    },
    {
        key: 'deleteStock',
        label: 'Excluir estoque',
        icon: <DeleteRounded fontSize="small"/>,
        color: 'error',
        action: (id: number, _navigate: NavigateFunction) => {
            const renderConfirmActionDialog = useConfirmActionDialogStore.getState().renderConfirmActionDialog;
            const closeConfirmActionDialog = useConfirmActionDialogStore.getState().handleClose;
            const renderToast = useToastStore.getState().renderToast;

            renderConfirmActionDialog({
                title: 'Excluir Estoque?',
                message: 'Você tem certeza que deseja excluir este estoque? Essa ação não pode ser desfeita.',
                confirmAction: {label: 'Excluir', onClick: async () => {
                    const returnedData = await deleteStockApi(id)

                    if(returnedData?.success) {
                        closeConfirmActionDialog()
                        renderToast({
                            type: 'success',
                            message: 'Estoque excluído com sucesso!'
                        })
                        queryClient.invalidateQueries({ queryKey: ['stocks'] });
                    } else {
                        closeConfirmActionDialog()
                        renderToast({
                            type: 'error',
                            message: returnedData?.message?? 'Erro ao excluir estoque!'
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