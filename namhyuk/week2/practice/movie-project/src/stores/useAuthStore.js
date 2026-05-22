import { create } from "zustand"; // zustand 상태 관리 라이브러리
import { persist } from "zustand/middleware"; // zustand 상태 영속화 미들웨어

const useAuthStore = create(
  persist(
    (set, get) => ({
      // 초기 상태 설정
      accessToken: null, // 엑세스 토큰 null로 초기화
      refreshToken: null, // 리프레시 토큰 null로 초기화

      // 토큰 저장함수
      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),

      // 기존 코드 호환용
      setAccessToken: (token) => set({ accessToken: token }),

      // 로그아웃 시 토큰 제거 함수
      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
        });

        // zustand persist 스토리지 삭제
        localStorage.removeItem("auth-storage");

        // 혹시 따로 저장된 토큰이 있을 경우 대비
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("token");
      },

      // 로그인 여부 확인 함수
      isLoggedIn: () => !!get().accessToken,
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;