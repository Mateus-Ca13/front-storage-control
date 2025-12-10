import { create } from 'zustand';

type useMovementStoreProps = {
    isEntryModalOpen: boolean
    openEntryModal: () => void
    closeEntryModal: () => void

    isTransferModalOpen: boolean
    openTransferModal: () => void
    closeTransferModal: () => void

    isExitModalOpen: boolean
    openExitModal: () => void
    closeExitModal: () => void
    
    isProductQuantityModalOpen: boolean
    openProductQuantityModal: () => void
    closeProductQuantityModal: () => void

    isObservationModalOpen: boolean
    openObservationModal: () => void
    closeObservationModal: () => void
}

export const useMovementStore  = create<useMovementStoreProps>((set) => ({
    
    isEntryModalOpen: false,
    openEntryModal: () => set({isEntryModalOpen: true}),
    closeEntryModal: () => set({isEntryModalOpen: false}),
    
    isTransferModalOpen: false,
    openTransferModal: () => set({isTransferModalOpen: true}),
    closeTransferModal: () => set({isTransferModalOpen: false}),

    isExitModalOpen: false,
    openExitModal: () => set({isExitModalOpen: true}),
    closeExitModal: () => set({isExitModalOpen: false}),

    isProductQuantityModalOpen: false,
    openProductQuantityModal: () => set({isProductQuantityModalOpen: true}),
    closeProductQuantityModal: () => set({isProductQuantityModalOpen: false}),

    isObservationModalOpen: false,
    openObservationModal: () => set({isObservationModalOpen: true}),
    closeObservationModal: () => set({isObservationModalOpen: false}),
}))


