import React from 'react'

export function Card({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-black/10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)] ${className}`}
      {...props}
    />
  )
}

export function CardBody({ className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-6 sm:p-8 ${className}`} {...props} />
}
