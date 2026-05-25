import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logoutAPI } from '../apis/authApi'

const useAuthStore = create(
    persist(
        (set, get) => ({
            accessToken: null,

            setAccessToken: (token) => set({ accessToken: token }),

            isLoggedIn: () => !!get().accessToken,

            logout: async () => {
                const token = get().accessToken
                if (token) {
                    await logoutAPI(token)
                }
                set({ accessToken: null })
                localStorage.removeItem('auth-storage')
            },
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default useAuthStore
