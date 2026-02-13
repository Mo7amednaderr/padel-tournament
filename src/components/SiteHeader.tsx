'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link className={`navlink ${active ? 'navlink-active' : ''}`} href={href}>
      {label}
    </Link>
  )
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="container-page h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
            <span className="font-black text-[12px] tracking-wide">PT</span>
          </div>
          <span className="font-semibold tracking-wide">Padel Tournament</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/tournaments" label="Tournaments" />
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/sign-in" className="btn btn-primary h-10 px-4">
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
