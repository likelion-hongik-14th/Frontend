import { useState } from 'react'
import Button from '../common/Button'
import QuantityControl from '../common/QuantityControl'

function MenuModal({ restaurant, onClose }) {
  const [selectedMenus, setSelectedMenus] = useState({})

  if (!restaurant) return null

  const handleAddMenu = (menuId) => {
    setSelectedMenus((prev) => ({
      ...prev,
      [menuId]: 1,
    }))
  }

  const handleIncrease = (menuId) => {
    setSelectedMenus((prev) => ({
      ...prev,
      [menuId]: prev[menuId] + 1,
    }))
  }

  const handleDecrease = (menuId) => {
    setSelectedMenus((prev) => {
      const currentCount = prev[menuId]

      if (currentCount <= 1) {
        const next = { ...prev }
        delete next[menuId]
        return next
      }

      return {
        ...prev,
        [menuId]: currentCount - 1,
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <section className="w-full max-w-[420px] rounded-modal bg-gray-0 p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium text-primary">
              {restaurant.category}
            </p>

            <h2 className="mt-1 text-[36px] font-bold text-gray-5">
              {restaurant.name}
            </h2>

            <p className="mt-2 text-[12px] font-medium text-gray-3">
              ⭐ {restaurant.rating}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[24px] font-medium text-gray-4 transition hover:text-primary"
            aria-label="모달 닫기"
          >
            ×
          </button>
        </div>

        <div className="my-6 h-px bg-gray-2" />

        <div className="space-y-9">
          {restaurant.menus?.map((menu) => {
            const count = selectedMenus[menu.id]

            return (
              <div
                key={menu.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-[20px] font-bold text-gray-5">
                    {menu.name}
                  </h3>

                  <p className="mt-1 text-[12px] font-medium text-gray-3">
                    {menu.description}
                  </p>

                  <p className="mt-1 text-[20px] font-bold text-gray-5">
                    {menu.price}
                  </p>
                </div>

                {count ? (
                  <QuantityControl
                    count={count}
                    onDecrease={() => handleDecrease(menu.id)}
                    onIncrease={() => handleIncrease(menu.id)}
                  />
                ) : (
                  <Button
                    variant="yellow"
                    size="sm"
                    className="w-24"
                    onClick={() => handleAddMenu(menu.id)}
                  >
                    담기
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default MenuModal