import { create } from "zustand"

type useAuthStoreProps = {
    user: {
        id: number,
        name: string,
        username: string,
        email: string,
    } | null,
    setUser: (
        id: number,
        name: string,
        username: string,
        email: string,
    ) => void,

}

export const useAuthStore = create<useAuthStoreProps>((set) => ({
    user: null,
    setUser: (id, name, username, email) => set({user: {id, name, username, email}}),
}))