import { create } from 'zustand';

type useProductStoreProps = {
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (value: boolean) => void
    openCreateModal: () => void
    closeCreateModal: () => void
}

export const useProductStore  = create<useProductStoreProps>((set) => ({
    
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({isCreateModalOpen: value}),
    openCreateModal: () => set({isCreateModalOpen: true}),
    closeCreateModal: () => set({isCreateModalOpen: false}),
    



}))


