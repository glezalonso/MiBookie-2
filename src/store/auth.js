import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set) => ({
            auth: '',
            isLogged: false,
            profile: '',
            isAdmin: false,
            setAuth: (token) =>
                set((status) => ({ auth: token, isLogged: true })),
            setProfile: (username) => set((status) => ({ profile: username })),
            setIsAdmin: (isAdmin) => set((status) => ({ isAdmin })),
            logOut: () =>
                set((status) => ({
                    auth: '',
                    isLogged: false,
                    profile: '',
                    isAdmin: false,
                })),
        }),
        { name: 'auth' }
    )
)
