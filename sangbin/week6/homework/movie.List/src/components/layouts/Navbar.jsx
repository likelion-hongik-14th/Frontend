import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useAuthStore from '../../stores/useAuthStore'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const closeMenu = () => setIsOpen(false)

    const accessToken = useAuthStore((state) => state.accessToken)
    const logout = useAuthStore((state) => state.logout)

    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        closeMenu()
        navigate('/login')
    }

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 dt:h-20 bg-black text-white border-b border-gray-600 z-50">
            <div className="h-full flex items-center justify-between px-4 tb:px-6 dt:px-10">
                <Link to="/" onClick={closeMenu} className="font-semibold text-xl dt:text-2xl">
                    MovieList🎬
                </Link>

                <div className="hidden tb:flex items-center gap-6 dt:gap-10">
                    <Link to="/top100" className="hover:text-gray-300">Top 100</Link>
                    <Link to="/mypage" className="hover:text-gray-300">My Page</Link>

                    {accessToken ? (
                        <button onClick={handleLogout} className="hover:text-gray-300">
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-300">Login</Link>
                            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="tb:hidden text-2xl"
                    aria-label="메뉴 토글"
                >
                    {isOpen ? '✖' : '☰'}
                </button>
            </div>

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
