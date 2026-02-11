'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) router.push('/auth/sign-in')
      else setEmail(data.user.email ?? null)
    }
    run()
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth/sign-in')
  }

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="opacity-80">Logged in as: {email ?? '...'}</p>

      <button onClick={signOut} className="rounded-lg bg-black text-white px-4 py-2">
        Sign out
      </button>
    </div>
  )
}
