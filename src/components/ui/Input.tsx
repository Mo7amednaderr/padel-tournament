import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string }

export function Input({ label, className = '', ...props }: Props) {
  return (
    <label className="block space-y-1.5">
      {label ? <span className="text-xs tracking-wide text-[rgb(var(--muted))]">{label}</span> : null}
      <input
        className={
          'w-full rounded-2xl border border-black/10 bg-white px-3 py-2.5 text-sm outline-none ' +
          'focus:ring-2 focus:ring-black/10 ' +
          className
        }
        {...props}
      />
    </label>
  )
}
