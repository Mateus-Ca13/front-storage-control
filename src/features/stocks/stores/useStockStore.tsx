import { create } from 'zustand';

type useStockStoreProps = {
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (value: boolean) => void
    openCreateModal: () => void
    closeCreateModal: () => void
}

export const useStockStore  = create<useStockStoreProps>((set) => ({
    
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({isCreateModalOpen: value}),
    openCreateModal: () => set({isCreateModalOpen: true}),
    closeCreateModal: () => set({isCreateModalOpen: false}),
    



}))


