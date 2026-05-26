function QuantityControl({
  count = 1,
  onDecrease,
  onIncrease,
  min = 1,
  className = '',
}) {
  const isMin = count <= min

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={isMin}
        className="flex h-5 w-5 items-center justify-center rounded-small bg-gray-1 text-[20px] font-medium text-gray-4 transition hover:bg-gray-2 disabled:cursor-not-allowed disabled:text-gray-2"
        aria-label="수량 감소"
      >
        -
      </button>

      <span className="min-w-4 text-center text-[20px] font-medium text-gray-5">
        {count}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        className="flex h-5 w-5 items-center justify-center rounded-small bg-gray-1 text-[20px] font-medium text-gray-4 transition hover:bg-gray-2"
        aria-label="수량 증가"
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl