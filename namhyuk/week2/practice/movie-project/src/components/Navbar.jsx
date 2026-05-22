import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutAPI } from "../apis/authApi";
import useAuthStore from "../stores/useAuthStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const clearTokens = useAuthStore((state) => state.clearTokens);

  const handleLogout = async () => {
    try {
      if (accessToken) {
        await logoutAPI(accessToken);
      }

      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error("로그아웃 API 실패:", error);
      alert("서버 로그아웃은 실패했지만, 로컬 토큰은 삭제합니다.");
    } finally {
      clearTokens(); // localStorage + zustand persist 스토리지 삭제
      setIsOpen(false);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* 로고 영역 */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="text-red-600 text-2xl font-bold tracking-tighter"
        >
          NETFLUX
        </Link>

        {/* 메뉴 영역 - PC */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300 items-center">
          <Link to="/" className="hover:text-white transition">
            MovieList
          </Link>

          <Link to="/top100" className="hover:text-white transition">
            Top100
          </Link>

          <Link to="/mypage" className="hover:text-white transition">
            MyPage
          </Link>

          {accessToken ? (
            <button
              type="button"
              onClick={handleLogout}
              className="hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>

              <Link to="/signup" className="hover:text-white transition">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? "X" : "☰"}
        </button>

        {/* 메뉴 영역 - 모바일 */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-black border-t border-zinc-800 p-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
            <Link to="/" onClick={() => setIsOpen(false)}>
              MovieList
            </Link>

            <Link to="/top100" onClick={() => setIsOpen(false)}>
              Top100
            </Link>

            <Link to="/mypage" onClick={() => setIsOpen(false)}>
              MyPage
            </Link>

            {accessToken ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-left"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>

                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;