function RestaurantCard({ restaurant, onClick }) {
  return (
    <article
      onClick={() => onClick(restaurant)}
      className="w-full cursor-pointer overflow-hidden rounded-modal bg-gray-0 transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-[140px] w-full bg-gray-1">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="text-[20px] font-medium text-gray-5">
          {restaurant.name}
        </h3>

        <p className="mt-1 text-[12px] font-medium text-gray-3">
          ⭐ {restaurant.rating}
        </p>

        <div className="mt-3 h-px bg-secondary" />

        <p className="mt-2 text-[12px] font-medium text-secondary">
          {restaurant.category}
        </p>
      </div>
    </article>
  )
}

export default RestaurantCard