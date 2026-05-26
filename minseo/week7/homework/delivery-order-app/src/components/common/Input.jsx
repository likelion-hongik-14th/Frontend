function Input({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error = false,
  disabled = false,
  className = '',
}) {
  const baseStyle =
    'h-12 w-full rounded-small border px-4 text-[20px] font-medium outline-none transition placeholder:text-gray-2 disabled:cursor-not-allowed disabled:bg-gray-1 disabled:text-gray-3'

  const stateStyle = error
    ? 'border-primary text-primary focus:border-primary'
    : 'border-gray-2 text-gray-5 focus:border-gray-4'

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseStyle} ${stateStyle} ${className}`}
    />
  )
}

export default Input