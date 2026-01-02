import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserAuth } from '../../../shared/types/user';


interface useAuthStoreProps {
    isAuthenticated: boolean;
    user: UserAuth | null;
    setUserInfo: (data: UserAuth) => void;
    logout: () => void;
}

export const useAuthStore = create<useAuthStoreProps>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUserInfo: (data) => {
                if(!data.role || !data.username || !data.email) return;
                set({ 
                    user: data, 
                    isAuthenticated: true
                 }); 
            },

            logout: () => {
                set({ user: null, isAuthenticated: false }); 
            }
        }),
        {
            name: 'auth-storage', 
            storage: createJSONStorage(() => localStorage), 
        }
    )
);