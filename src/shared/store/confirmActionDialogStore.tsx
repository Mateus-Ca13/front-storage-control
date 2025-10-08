import { create } from "zustand";

export type ConfirmActionDialogStoreProps = {
    open: boolean;
    handleClose: () => void;
    message?: string;
    title?: string;
    confirmAction?: {label: string, onClick: (...args: any[]) => any}
    cancelAction?: {label: string, onClick: (...args: any[]) => any}
    renderConfirmActionDialog: (dialog: ConfirmActionDialogProps) => any;
}
export type ConfirmActionDialogProps = Omit<ConfirmActionDialogStoreProps, 'renderConfirmActionDialog' | 'handleClose' | 'open' | 'CloseConfirmActionDialog'>

export const useConfirmActionDialogStore = create<ConfirmActionDialogStoreProps>((set) => ({
    open: false,
    handleClose: () => set({open: false}),  
    message: "",
    title: "",
    confirmAction: {label: 'Confirmar', onClick: ()=>{}},
    cancelAction: {label: 'Cancelar', onClick: ()=>{}},

    renderConfirmActionDialog: (dialog: ConfirmActionDialogProps) => set(() => ({...dialog, open: true})),
}));
