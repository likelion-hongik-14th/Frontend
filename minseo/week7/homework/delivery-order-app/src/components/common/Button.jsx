function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}) {
  const baseStyle =
    'inline-flex items-center justify-center rounded-button font-bold transition duration-200 disabled:cursor-not-allowed disabled:bg-gray-2 disabled:text-gray-0'

  const variantStyle = {
    primary: 'bg-primary text-gray-0 hover:brightness-95',
    secondary: 'bg-secondary text-gray-5 hover:brightness-95',
    assistive: 'bg-assistive text-gray-5 hover:brightness-95',
    yellow: 'bg-yellow-primary text-gray-5 hover:brightness-95',
    outline: 'border border-gray-2 bg-gray-0 text-gray-5 hover:bg-gray-1',
    dark: 'bg-gray-5 text-gray-0 hover:bg-gray-4',
  }

  const sizeStyle = {
    sm: 'h-9 px-4 text-[12px]',
    md: 'h-12 px-5 text-[20px]',
    lg: 'h-14 px-6 text-[20px]',
    full: 'h-12 w-full text-[20px]',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle[variant]} ${sizeStyle[size]} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button