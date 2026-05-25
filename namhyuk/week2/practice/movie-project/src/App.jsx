import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import useAuthStore from "./stores/useAuthStore";
// 컴포넌트 임포트
import Navbar from "./components/Navbar";

// 페이지 임포트
import MovieList from "./pages/MovieList";
import Login from "./pages/Login";
import Top100 from "./pages/Top100";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";

import Signup from "./pages/Signup";


function App() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* 모든 페이지에서 공통으로 보이는 상단 바 */}
        <Navbar />

        {/* 경로(URL)에 따라 바뀌는 메인 컨텐츠 영역 */}
        <main>
          <Routes>
            {/* 메인 페이지 */}
            <Route path="/" element={<MovieList />} />

            {/* 로그인 페이지 */}
            <Route path="/login" element={<Login />} />

            {/* 인기 영화 Top 100 페이지 */}
            <Route path="/top100" element={<Top100 />} />

            {/* 마이페이지 */}
            <Route path="/mypage" element={accessToken ? <MyPage /> : <Navigate to='/login' replace />} />

            {/* 회원가입 */}
            <Route path="/signup" element={<Signup />} />

            {/* 404 페이지 (위의 경로 외에 접속 시) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* 푸터가 필요하다면 여기에 추가 가능 */}
      </div>
    </Router>
  );
}

export default App;
