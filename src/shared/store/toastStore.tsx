import { create } from "zustand";


type ToastStoreProps = {
    open: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    action?: React.ReactNode;
    renderToast: (toast: Omit<ToastStoreProps, 'renderToast' | 'closeToast' | 'open'>) => void;
    closeToast: () => void;
}

export const useToastStore = create<ToastStoreProps>((set) => ({
    open: false,
    type: 'error',
    message: 'Testando toast',
    action: undefined,
    renderToast: (toast: Omit<ToastStoreProps, 'renderToast' | 'closeToast' | 'open'>) => set(() => ({...toast, open: true})),
    closeToast: () => set(() => ({open: false})),
}));