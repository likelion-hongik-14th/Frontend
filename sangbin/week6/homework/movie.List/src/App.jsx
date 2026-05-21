import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

import Mypage from "./pages/Mypage"
import NotFound from "./pages/NotFound"
import Top100 from "./pages/Top100"
import MovieList from "./pages/MovieList"
import Login from "./pages/Login"
import Signup from "./pages/Signup"            //  새 페이지 import
import { Layout } from "./components/layouts/Layout"
import useAuthStore from "./stores/useAuthStore"


function App() {
  // zustand store에서 accessToken 상태를 구독
  // 토큰이 바뀌면 이 컴포넌트가 자동으로 다시 렌더링됨
  const accessToken = useAuthStore((state) => state.accessToken)

  return (
    <BrowserRouter>
      <Routes>
        {/* 공통 레이아웃 (Navbar + 본문) 안에 페이지들을 중첩 */}
        <Route path="/" element={<Layout />}>

          {/* index = 부모 경로(/) 와 정확히 일치할 때 보여줌 */}
          <Route index element={<MovieList />} />

          <Route path="login" element={<Login />} />

          {/* 회원가입 경로 추가 */}
          <Route path="signup" element={<Signup />} />

          {/*
            마이페이지 보호 (소문자 navigate → 대문자 Navigate 로 버그 수정)
            accessToken이 있으면 → <Mypage /> 보여줌
            없으면              → <Navigate /> 로 /login 으로 강제 이동
            replace 옵션: 뒤로가기 눌렀을 때 보호 페이지로 다시 돌아가지 않게 함
          */}
          <Route
            path="mypage"
            element={accessToken ? <Mypage /> : <Navigate to="/login" replace />}
          />

          <Route path="top100" element={<Top100 />} />

          {/* * = 그 외 모든 경로 (404) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
