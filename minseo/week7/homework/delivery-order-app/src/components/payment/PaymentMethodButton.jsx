function PaymentMethodButton({
  children,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-12 rounded-button border px-5 text-[20px] font-bold transition ${
        selected
          ? 'border-primary bg-primary text-gray-0'
          : 'border-gray-2 bg-gray-0 text-gray-5 hover:border-primary hover:text-primary'
      }`}
    >
      {children}
    </button>
  )
}

export default PaymentMethodButton