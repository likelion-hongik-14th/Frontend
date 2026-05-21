import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { logoutAPI } from '../apis/authApi'    //  로그아웃 API 함수 import


const useAuthStore = create(
    persist(

        //  (set, get) 두 개를 받음
        //   set : 상태를 바꾸는 함수
        //   get : 현재 상태를 읽는 함수 (이전 코드는 get 안 받았음 = 버그였음)
        (set, get) => ({

            // ===== 상태 =====
            accessToken: null,

            // ===== 액션 (상태를 바꾸는 함수들) =====

            // 로그인 성공 시 호출: 토큰 저장
            setAccessToken: (token) => set({ accessToken: token }),

            // 로그인 상태 확인 (수정: set() → get())
            isLoggedIn: () => !!get().accessToken,

            //  로그아웃 액션 (새로 추가)
            logout: async () => {
                // 현재 토큰 가져오기
                const token = get().accessToken

                // 토큰이 있으면 서버에 "로그아웃해줘" 알림
                if (token) {
                    await logoutAPI(token)
                }

                // 클라이언트 상태에서 토큰 제거 (메모리 + localStorage)
                set({ accessToken: null })

                
                localStorage.removeItem('auth-storage')
            },
        }),
        {
            name: 'auth-storage',  // localStorage에 저장될 키 이름
        }
    )
)

export default useAuthStore
