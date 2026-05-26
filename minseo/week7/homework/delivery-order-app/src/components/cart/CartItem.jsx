import QuantityControl from '../common/QuantityControl'

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <article className="flex items-center justify-between gap-4 border-b border-gray-2 py-4">
      <div>
        <h3 className="text-[20px] font-bold text-gray-5">{item.name}</h3>

        <p className="mt-1 text-[12px] font-medium text-gray-3">
          {item.description}
        </p>

        <p className="mt-2 text-[20px] font-bold text-primary">
          {item.price}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-[12px] font-medium text-gray-3 transition hover:text-primary"
        >
          삭제
        </button>

        <QuantityControl
          count={item.count}
          onDecrease={() => onDecrease(item.id)}
          onIncrease={() => onIncrease(item.id)}
        />
      </div>
    </article>
  )
}

export default CartItem