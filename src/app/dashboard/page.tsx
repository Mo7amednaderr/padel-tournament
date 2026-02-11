'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState<string>('')

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.replace('/auth/sign-in')
        return
      }

      // (اختياري) نجيب الاسم من profiles
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', data.user.id)
        .single()

      setName(profile?.full_name ?? '')
      setLoading(false)
    }
    run()
  }, [router])

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/auth/sign-in')
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="min-h-screen p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {name ? <p className="opacity-80">Welcome, {name}</p> : null}
        </div>

        <button onClick={logout} className="border rounded-lg px-4 py-2">
          Sign out
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/tournaments" className="border rounded-xl p-5 hover:bg-gray-50">
          <h2 className="text-xl font-semibold">Tournaments</h2>
          <p className="opacity-80">Browse & join tournaments</p>
        </Link>

        <div className="border rounded-xl p-5 opacity-60">
          <h2 className="text-xl font-semibold">Rankings</h2>
          <p className="opacity-80">Coming soon</p>
        </div>

        <div className="border rounded-xl p-5 opacity-60">
          <h2 className="text-xl font-semibold">Live Matches</h2>
          <p className="opacity-80">Coming soon</p>
        </div>
      </div>
    </div>
  )
}
