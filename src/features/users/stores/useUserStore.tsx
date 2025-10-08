import { create } from "zustand"

type useUserStoreProps = {
  changePasswordDialogIsVisible: boolean
  openChangePasswordDialog: () => void
  closeChangePasswordDialog: () => void
}

export const useUserStore = create<useUserStoreProps>((set) => ({
    
  changePasswordDialogIsVisible: false,
  openChangePasswordDialog: () => set({ changePasswordDialogIsVisible: true }),
  closeChangePasswordDialog: () => set({ changePasswordDialogIsVisible: false }),
  
}))

