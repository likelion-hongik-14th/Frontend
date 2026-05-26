import CartItem from './CartItem'

function CartList({
  items = [],
  onIncrease,
  onDecrease,
  onRemove,
}) {
  if (items.length === 0) {
    return (
      <section className="rounded-modal bg-gray-0 p-6">
        <h2 className="text-[24px] font-medium text-gray-5">장바구니</h2>

        <p className="mt-4 text-[20px] font-medium text-gray-3">
          아직 담긴 메뉴가 없습니다.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-modal bg-gray-0 p-6">
      <h2 className="text-[24px] font-medium text-gray-5">장바구니</h2>

      <div className="mt-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  )
}

export default CartList