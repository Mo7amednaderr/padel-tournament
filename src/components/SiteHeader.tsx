'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={[
        'px-3 py-2 rounded-full text-sm font-medium transition',
        active ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5',
      ].join(' ')}
    >
      {label}
    </Link>
  )
}

export default function SiteHeader() {
  const router = useRouter()
  const [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    // initial
    supabase.auth.getSession().then(({ data }) => {
      setSignedIn(!!data.session)
    })

    // realtime updates
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session)
    })

    return () => {
      sub.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="container-page h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/10 grid place-items-center">
            <span className="font-black text-[12px] tracking-wide">PT</span>
          </div>

          <div className="leading-tight">
            <div className="font-semibold tracking-wide">Padel Tournament</div>
            <div className="text-xs text-white/50 -mt-0.5">Where players meet structure</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <NavLink href="/dashboard" label="Dashboard" />
          <NavLink href="/tournaments" label="Tournaments" />
        </nav>

        <div className="flex items-center gap-3">
          {signedIn ? (
            <button
              onClick={signOut}
              className="h-10 px-4 rounded-xl border border-white/15 bg-white/5 text-white/90 hover:bg-white/10 transition"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/auth/sign-in"
              className="h-10 px-4 rounded-xl bg-[color:var(--brand)] text-black font-semibold hover:brightness-110 transition"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
