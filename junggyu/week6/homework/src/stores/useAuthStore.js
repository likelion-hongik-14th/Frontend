import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            accessToken: null,
            isLoggedIn: false,

            setAccessToken: (token) =>
                set({
                    accessToken: token,
                    isLoggedIn: true,
                }),

            clearAuth: () =>
                set({
                    accessToken: null,
                    isLoggedIn: false,
                }),
        }),
        {
        name: "auth-storage",
        }
    )
);

export default useAuthStore;