'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Level = {
  id: number
  name: string
  fee_amount: number
  currency: string
  is_active: boolean
}

export default function SignUpPage() {
  const router = useRouter()
  const [levels, setLevels] = useState<Level[]>([])
  const [levelsLoading, setLevelsLoading] = useState(true)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [levelId, setLevelId] = useState<number | ''>('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    const loadLevels = async () => {
      setLevelsLoading(true)
      const { data, error } = await supabase
        .from('levels')
        .select('id,name,fee_amount,currency,is_active')
        .eq('is_active', true)
        .order('id', { ascending: true })

      setLevelsLoading(false)
      if (error) return setErrorMsg(error.message)

      const list = (data ?? []) as Level[]
      setLevels(list)
      if (list.length > 0) setLevelId(list[0].id)
    }
    loadLevels()
  }, [])

  const selectedLevel = useMemo(() => {
    if (levelId === '') return null
    return levels.find((l) => l.id === levelId) ?? null
  }, [levels, levelId])

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!fullName.trim()) return setErrorMsg('Enter full name.')
    if (!phone.trim()) return setErrorMsg('Enter phone.')
    if (levelId === '') return setErrorMsg('Choose level.')
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
      level_id: levelId,
    })
    if (profileError) {
      setLoading(false)
      return setErrorMsg(`Profile error: ${profileError.message}`)
    }

    const { error: reqError } = await supabase.from('level_signups').insert({
      user_id: userId,
      level_id: levelId,
      status: 'pending',
    })
    setLoading(false)

    if (reqError) return setErrorMsg(`Signup request error: ${reqError.message}`)

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={signUp} className="w-full max-w-md border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Create account</h1>

        <input className="w-full border rounded-lg p-2" placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input className="w-full border rounded-lg p-2" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

        {levelsLoading ? (
          <p className="text-sm opacity-70">Loading levels...</p>
        ) : (
          <select className="w-full border rounded-lg p-2" value={levelId} onChange={(e) => setLevelId(Number(e.target.value))}>
            {levels.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} — {l.fee_amount} {l.currency}
              </option>
            ))}
          </select>
        )}

        {selectedLevel ? (
          <p className="text-sm opacity-80">
            Fees: <span className="font-medium">{selectedLevel.fee_amount}</span> {selectedLevel.currency}
          </p>
        ) : null}

        <hr />

        <input className="w-full border rounded-lg p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full border rounded-lg p-2" type="password" placeholder="Password (min 6)" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {errorMsg ? <p className="text-sm text-red-600">{errorMsg}</p> : null}

        <button className="w-full rounded-lg bg-black text-white p-2 disabled:opacity-60" disabled={loading || levelsLoading}>
          {loading ? 'Creating...' : 'Create account'}
        </button>

        <p className="text-sm">
          Have account? <a className="underline" href="/auth/sign-in">Sign in</a>
        </p>
      </form>
    </div>
  )
}
