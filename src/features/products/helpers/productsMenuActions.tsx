import { DeleteRounded, VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";
import { useConfirmActionDialogStore } from "../../../shared/store/confirmActionDialogStore";
import { deleteProductApi } from "../api/productsApi";
import { useToastStore } from "../../../shared/store/toastStore";
import { queryClient } from "../../../lib/reactQueryClient";


export const productsMenuActions: ActionMenuOption[] = [
    {
        key: 'viewProduct',
        label: 'Visualizar produto',
        icon: <VisibilityRounded fontSize="small"/>,
        color: 'common',
        action: (id: number, navigate: NavigateFunction) => navigate(`/dashboard/products/${id}`),
    },

    {
        key: 'deleteProduct',
        label: 'Excluir produto',
        icon: <DeleteRounded fontSize="small"/>,
        color: 'error',
        action: (id: number, _navigate: NavigateFunction) => {
          const renderConfirmActionDialog = useConfirmActionDialogStore.getState().renderConfirmActionDialog;
          const closeConfirmActionDialog = useConfirmActionDialogStore.getState().handleClose;
          const renderToast = useToastStore.getState().renderToast;

            renderConfirmActionDialog({
                title: 'Excluir produto?',
                message: 'Você tem certeza que deseja excluir este produto? Essa ação não pode ser desfeita.',
                confirmAction: {label: 'Excluir', onClick: async () => {
                    const returnedData = await deleteProductApi(id)

                    if(returnedData?.success) {
                        closeConfirmActionDialog()
                        renderToast({
                            type: 'success',
                            message: 'Produto excluído com sucesso!'
                        })
                        queryClient.invalidateQueries({ queryKey: ['products'] });
                    } else {
                        closeConfirmActionDialog()
                        renderToast({
                            type: 'error',
                            message: returnedData.message?? 'Erro ao excluir produto!'
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
