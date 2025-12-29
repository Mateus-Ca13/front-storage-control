import { create } from 'zustand';

type useProductStoreProps = {
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (value: boolean) => void
    openCreateModal: () => void
    closeCreateModal: () => void

    isImportProductsModalOpen: boolean
    setIsImportProductModalOpen: (value: boolean) => void
    openImportProductModal: () => void
    closeImportProductModal: () => void
}

export const useProductStore  = create<useProductStoreProps>((set) => ({
    
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({isCreateModalOpen: value}),
    openCreateModal: () => set({isCreateModalOpen: true}),
    closeCreateModal: () => set({isCreateModalOpen: false}),

    isImportProductsModalOpen: false,
    setIsImportProductModalOpen: (value) => set({isImportProductsModalOpen: value}),
    openImportProductModal: () => set({isImportProductsModalOpen: true}),
    closeImportProductModal: () => set({isImportProductsModalOpen: false}),
    
}))


