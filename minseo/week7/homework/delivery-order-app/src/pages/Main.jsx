import Navbar from '../components/common/Navbar'
import RestaurantCard from '../components/restaurant/RestaurantCard'
import { restaurants } from '../data/restaurants'

function Main() {
  const handleCardClick = (restaurant) => {
    // 나중에 모달 컴포넌트 연결할 자리.
    console.log('클릭된 음식점:', restaurant.name);
  };

  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />

      <main className="mx-auto max-w-[1725px] px-5 py-10 dt:px-10">
        
        {/* 음식점 리스트 영역 */}
        <section>
          {/* 피그마에 있는 섹션 타이틀 */}
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
    </div>
  )
}

export default Main