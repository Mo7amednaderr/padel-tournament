'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SignUpPage() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!fullName.trim()) return setErrorMsg('Enter full name.')
    if (!phone.trim()) return setErrorMsg('Enter phone.')
    if (password.length < 6) return setErrorMsg('Password min 6 chars.')

    setLoading(true)

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError) {
      setLoading(false)
      return setErrorMsg(signUpError.message)
    }

    const userId = signUpData.user?.id
    if (!userId) {
      setLoading(false)
      return setErrorMsg('User not created. Try again.')
    }

    const { error: profileError } = await supabase.from('profiles').upsert(
      {
        user_id: userId,
        full_name: fullName,
        phone,
      },
      { onConflict: 'user_id' } // مهم علشان upsert يشتغل صح
    )

    setLoading(false)
    if (profileError) return setErrorMsg(`Profile error: ${profileError.message}`)

    router.push('/dashboard')
  }

  return (
    <main className="container-page py-12">
      <div className="min-h-[70vh] grid place-items-center">
        <div className="w-full max-w-md card">
          <h1 className="text-3xl font-extrabold tracking-tight">Create Account</h1>
          <p className="mt-2 muted">Join tournaments, track ranking, and more.</p>

          <form onSubmit={signUp} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Full name</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none
                           focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                placeholder="Mohamed Nader"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Phone</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none
                           focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                placeholder="01xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Email</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none
                           focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Password</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none
                           focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                type="password"
                placeholder="Min 6 chars"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMsg ? (
              <p className="text-sm text-red-400 border border-red-500/20 bg-red-500/10 rounded-xl px-4 py-3">
                {errorMsg}
              </p>
            ) : null}

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Creating…' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-sm muted text-center">
            Already have an account?{' '}
            <Link className="text-white underline underline-offset-4 hover:text-white/90" href="/auth/sign-in">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
