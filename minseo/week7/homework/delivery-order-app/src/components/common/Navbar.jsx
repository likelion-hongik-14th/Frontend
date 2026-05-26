import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menus = [
    { id: 1, name: '홈', path: '/main' },
    { id: 2, name: '음식점', path: '/main' },
    { id: 3, name: '컴포넌트 테스트', path: '/test' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-gray-2 bg-gray-0">
      <nav className="mx-auto flex h-16 w-full max-w-[1725px] items-center justify-between px-5 dt:px-10">
        <Link to="/main" className="text-[24px] font-bold text-primary">
          DELIFOOD
        </Link>

        {/* dt 환경: 상단바 */}
        <ul className="hidden items-center gap-8 text-[20px] font-medium text-gray-5 dt:flex">
          {menus.map((menu) => (
            <li key={menu.id}>
              <Link
                to={menu.path}
                className="transition hover:text-primary"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ph 환경: 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-button bg-assistive text-[24px] font-bold text-primary dt:hidden"
          aria-label="메뉴 열기"
        >
          {isOpen ? '×' : '☰'}
        </button>
      </nav>

      {/* ph 환경: 햄버거 메뉴 */}
      {isOpen && (
        <div className="border-t border-gray-2 bg-gray-0 px-5 py-5 dt:hidden">
          <ul className="flex flex-col gap-3 text-[20px] font-medium text-gray-5">
            {menus.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.path}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-button px-4 py-3 transition hover:bg-assistive hover:text-primary"
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar