import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed'

  const styles =
    variant === 'primary'
      ? 'bg-[rgb(var(--text))] text-white hover:opacity-90'
      : variant === 'secondary'
      ? 'border border-black/15 bg-white hover:bg-black/5'
      : 'hover:bg-black/5'

  return <button className={`${base} ${styles} ${className}`} {...props} />
}
