'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Card, CardBody } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

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
    <div className="min-h-[70vh] grid place-items-center">
      <Card className="w-full max-w-md">
        <CardBody className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-[rgb(var(--muted))]">Welcome back. Continue to your dashboard.</p>
          </div>

          <form onSubmit={signIn} className="space-y-4">
            <Input label="EMAIL" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            <Input label="PASSWORD" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

            <Button className="w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p className="text-sm text-[rgb(var(--muted))]">
            No account? <Link className="text-[rgb(var(--text))] underline underline-offset-4" href="/auth/sign-up">Create one</Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
