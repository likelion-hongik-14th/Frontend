import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuthStore from '../../stores/useAuthStore'    // store import


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const closeMenu = () => setIsOpen(false)

    // zustand store에서 필요한 것들 꺼내오기
    const accessToken = useAuthStore((state) => state.accessToken)  // 로그인 여부 판단
    const logout = useAuthStore((state) => state.logout)            // 로그아웃 액션

    const navigate = useNavigate()

    // 로그아웃 버튼 클릭 시
    const handleLogout = async () => {
        await logout()           // store의 logout 액션 호출 (API + 토큰 삭제)
        closeMenu()              // 모바일 메뉴가 열려있었다면 닫기
        navigate('/login')       // 로그인 페이지로 이동
    }


    return (
        <nav className="fixed top-0 left-0 right-0 h-16 dt:h-20 bg-black text-white border-b border-gray-600 z-50">
            <div className="h-full flex items-center justify-between px-4 tb:px-6 dt:px-10">
                {/* 로고 */}
                <Link to="/" onClick={closeMenu} className="font-semibold text-xl dt:text-2xl">
                    MovieList🎬
                </Link>

                {/* 데스크탑 메뉴 */}
                <div className="hidden tb:flex items-center gap-6 dt:gap-10">
                    <Link to="/top100" className="hover:text-gray-300">Top 100</Link>
                    <Link to="/mypage" className="hover:text-gray-300">My Page</Link>

                    {/* 조건부 렌더링: 토큰이 있으면(로그인) 로그아웃 / 없으면 로그인 + 회원가입 */}
                    {accessToken ? (
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-300"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                        </>
                    )}
                </div>

                {/* 모바일 햄버거 버튼 */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="tb:hidden text-2xl"
                    aria-label="메뉴 토글"
                >
                    {isOpen ? '✖' : '☰'}
                </button>
            </div>

            {/* 모바일 드롭다운 메뉴 */}
            {isOpen && (
                <div className="tb:hidden absolute top-16 left-0 right-0 bg-black border-t border-gray-700 flex flex-col px-6 py-4 space-y-4">
                    <Link to="/top100" onClick={closeMenu}>Top 100</Link>
                    <Link to="/mypage" onClick={closeMenu}>My Page</Link>

                    {accessToken ? (
                        <button onClick={handleLogout} className="text-left">Logout</button>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeMenu}>Login</Link>
                            <Link to="/signup" onClick={closeMenu}>Signup</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    )
}

export default Navbar
