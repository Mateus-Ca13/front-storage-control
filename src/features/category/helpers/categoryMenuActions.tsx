import { DeleteRounded, VisibilityRounded } from "@mui/icons-material";
import type { ActionMenuOption } from "../../../shared/types/actionMenuOption";
import type { NavigateFunction } from "react-router-dom";
import { useConfirmActionDialogStore } from "../../../shared/store/confirmActionDialogStore";
import { useToastStore } from "../../../shared/store/toastStore";
import { deleteCategoryApi } from "../api/categoryApi";
import { queryClient } from "../../../lib/reactQueryClient";

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
        action: (id: number, _navigate: NavigateFunction) => {
            const renderConfirmActionDialog = useConfirmActionDialogStore.getState().renderConfirmActionDialog;
            const closeConfirmActionDialog = useConfirmActionDialogStore.getState().handleClose;
            const renderToast = useToastStore.getState().renderToast;

            renderConfirmActionDialog({
                title: 'Excluir categoria?',
                message: 'Você tem certeza que deseja excluir esta categoria? Essa ação não pode ser desfeita.',
                confirmAction: {label: 'Excluir', onClick: async () => {
                    const returnedData = await deleteCategoryApi(id)

                    if(returnedData?.success) {
                        closeConfirmActionDialog()
                        renderToast({
                            type: 'success',
                            message: `Categoria excluída com sucesso! ${returnedData.data.updatedProductsCount} produto(s) foram desassociados.`
                        })
                        queryClient.invalidateQueries({ queryKey: ['categories'] });
                    } else {
                        closeConfirmActionDialog()
                        renderToast({
                            type: 'error',
                            message: returnedData?.message?? 'Erro ao excluir categoria!'
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