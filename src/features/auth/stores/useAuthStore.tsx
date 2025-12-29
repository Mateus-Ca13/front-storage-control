import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserAuth } from '../../../shared/types/user';


interface useAuthStoreProps {
    user: UserAuth | null;
    setUserInfo: (data: UserAuth) => void;
    logout: () => void;
}

export const useAuthStore = create<useAuthStoreProps>()(
    persist(
        (set) => ({
            user: null,

            setUserInfo: (data) => {
                if(!data.role || !data.username || !data.email) return;
                set({ user: data }); 
            },

            logout: () => {
                set({ user: null }); 
            }
        }),
        {
            name: 'auth-storage', 
            storage: createJSONStorage(() => localStorage), 
        }
    )
);