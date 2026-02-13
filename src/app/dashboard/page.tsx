'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/auth/sign-in')
      } else {
        setEmail(data.user.email ?? null)

      }
    }
    getUser()
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="container-page">
      <div className="flex justify-between items-center mb-10">
        <h1 className="title-main">Dashboard</h1>
        <button
          onClick={signOut}
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Sign out
        </button>
      </div>

      <p className="mb-8 text-zinc-400">
        Welcome, {email}
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => router.push('/tournaments')}
          className="card cursor-pointer"
        >
          <h2 className="section-title">Tournaments</h2>
          <p className="muted">Browse & join tournaments</p>
        </div>

        <div className="card opacity-60">
          <h2 className="section-title">Rankings</h2>
          <p className="muted">Coming soon</p>
        </div>

        <div className="card opacity-60">
          <h2 className="section-title">Live Matches</h2>
          <p className="muted">Coming soon</p>
        </div>

      </div>
    </div>
  )
}
