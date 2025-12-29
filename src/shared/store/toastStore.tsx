import { create } from "zustand";


type ToastStoreProps = {
    open: boolean;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    action?: React.ReactNode;
    renderToast: (toast: Omit<ToastStoreProps, 'renderToast' | 'closeToast' | 'open' | 'toastId'>) => void;
    closeToast: () => void;
    toastId: Date
}

export const useToastStore = create<ToastStoreProps>((set) => ({
    open: false,
    type: 'error',
    message: '',
    action: undefined,
    renderToast: (toast: Omit<ToastStoreProps, 'renderToast' | 'closeToast' | 'open' | 'toastId'>) => set(() => ({...toast, open: true, toastId: new Date()})),
    closeToast: () => set(() => ({open: false})),
    toastId: new Date()
}));