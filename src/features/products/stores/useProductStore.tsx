import { create } from 'zustand';

type useProductStoreProps = {
    isCreateModalOpen: boolean
    setIsCreateModalOpen: (value: boolean) => void

    productIdOnFocus: number | null
    setProductIdOnFocus: (id: number | null) => void

    openCreateModal: () => void
    closeCreateModal: () => void
    

}

export const useProductStore  = create<useProductStoreProps>((set) => ({
    
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({isCreateModalOpen: value}),

    productIdOnFocus: null,
    setProductIdOnFocus: (id) => set({productIdOnFocus: id}),

    openCreateModal: () => set({isCreateModalOpen: true}),
    closeCreateModal: () => set({isCreateModalOpen: false}),
    



}))


