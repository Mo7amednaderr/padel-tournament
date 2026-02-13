'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) return alert(error.message)

    router.push('/dashboard')
  }

  return (
    <main className="container-page py-12">
      <div className="min-h-[70vh] grid place-items-center">
        <div className="w-full max-w-md card">
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="mt-2 muted">Sign in to your account to continue.</p>

          <form onSubmit={signIn} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Email</label>
              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none
                           focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-white/80">Password</label>
                <button
                  type="button"
                  className="text-sm text-white/60 hover:text-white underline underline-offset-4"
                  onClick={() => alert('Later: reset password')}
                >
                  Forgot password?
                </button>
              </div>

              <input
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none
                           focus:border-[color:var(--brand)] focus:ring-2 focus:ring-[color:var(--brand)]/20"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-sm muted text-center">
            Don&apos;t have an account?{' '}
            <Link className="text-white underline underline-offset-4 hover:text-white/90" href="/auth/sign-up">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
