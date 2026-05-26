import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import MenuModal from '../components/restaurant/MenuModal'
import { restaurants } from '../data/restaurants'

function Main() {
  // 💡 어떤 음식점이 클릭되었는지 기억하는 state (초기값은 선택 안 됨 = null)
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)

  const handleCardClick = (restaurant) => {
    // 카드를 클릭하면 해당 음식점 데이터를 state에 저장 (이때 모달이 짠! 하고 열림)
    setSelectedRestaurant(restaurant)
  }

  const handleCloseModal = () => {
    // 닫기(X) 버튼을 누르면 state를 다시 비워줌 (모달이 닫힘)
    setSelectedRestaurant(null)
  }

  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />

      <main className="mx-auto max-w-[1725px] px-5 py-10 dt:px-10">
        
        {/* 음식점 리스트 영역 */}
        <section>
          <h2 className="mb-6 text-[24px] font-bold text-gray-5">
            인기 맛집 총집합
          </h2>

          <div className="grid grid-cols-1 gap-5 dt:grid-cols-4 dt:gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </section>

      </main>

      {/* 💡 모달 컴포넌트 추가: 선택된 음식점 정보와 닫기 함수를 전달해 줍니다. */}
      <MenuModal 
        restaurant={selectedRestaurant} 
        onClose={handleCloseModal} 
      />
    </div>
  )
}

export default Main