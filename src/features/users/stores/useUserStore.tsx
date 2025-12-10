import { create } from "zustand"

type useUserStoreProps = {
  changePasswordDialogIsVisible: boolean
  openChangePasswordDialog: () => void
  closeChangePasswordDialog: () => void
  isCreateModalOpen: boolean
setIsCreateModalOpen: (value: boolean) => void
openCreateModal: () => void
closeCreateModal: () => void
}

export const useUserStore = create<useUserStoreProps>((set) => ({
    
    changePasswordDialogIsVisible: false,
    openChangePasswordDialog: () => set({ changePasswordDialogIsVisible: true }),
    closeChangePasswordDialog: () => set({ changePasswordDialogIsVisible: false }),
    
    isCreateModalOpen: false,
    setIsCreateModalOpen: (value) => set({isCreateModalOpen: value}),
    openCreateModal: () => set({isCreateModalOpen: true}),
    closeCreateModal: () => set({isCreateModalOpen: false}),
  
}))

