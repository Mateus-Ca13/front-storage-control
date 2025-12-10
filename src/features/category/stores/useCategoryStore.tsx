import { create } from 'zustand';

type useCategoryStoreProps = {
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (value: boolean) => void
    openCreateModal: () => void
    closeCreateModal: () => void
}

export const useCategoryStore  = create<useCategoryStoreProps>((set) => ({
    
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({isCreateModalOpen: value}),
    openCreateModal: () => set({isCreateModalOpen: true}),
    closeCreateModal: () => set({isCreateModalOpen: false}),
    



}))


