'use client'

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

    const { error: profileError } = await supabase.from('profiles').upsert({
      user_id: userId,
      full_name: fullName,
      phone,
    })
    setLoading(false)

    if (profileError) return setErrorMsg(`Profile error: ${profileError.message}`)

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={signUp} className="w-full max-w-md border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>

        <input className="w-full border rounded-lg p-2" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="w-full border rounded-lg p-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

        <input className="w-full border rounded-lg p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded-lg p-2" type="password" placeholder="Password (min 6)" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {errorMsg ? <p className="text-sm text-red-600">{errorMsg}</p> : null}

        <button className="w-full rounded-lg bg-black text-white p-2 disabled:opacity-60" disabled={loading}>
          {loading ? 'Creating...' : 'Create account'}
        </button>

        <p className="text-sm">
          Have account? <a className="underline" href="/auth/sign-in">Sign in</a>
        </p>
      </form>
    </div>
  )
}
