'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useParams } from 'next/navigation'

type Level = {
  id: number
  name: string
  fee_amount: number
  currency: string
}

export default function TournamentDetails() {
  const params = useParams()
  const tournamentId = params.id

  const [levels, setLevels] = useState<Level[]>([])
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLevels = async () => {
      const { data } = await supabase
        .from('tournament_levels')
        .select('*')
        .eq('tournament_id', tournamentId)
        .eq('is_active', true)

      if (data) setLevels(data)
      setLoading(false)
    }

    fetchLevels()
  }, [tournamentId])

  const handleJoin = async () => {
    if (!selectedLevel) return alert('Choose a level')

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) return alert('Login first')

    const { error } = await supabase.from('tournament_registrations').insert({
      tournament_id: tournamentId,
      user_id: user.id,
      level_id: selectedLevel,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Registration submitted! We will contact you.')
    }
  }

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Choose Level</h1>

      {levels.map((level) => (
        <div
          key={level.id}
          className={`border p-4 rounded-xl cursor-pointer ${
            selectedLevel === level.id ? 'border-black' : ''
          }`}
          onClick={() => setSelectedLevel(level.id)}
        >
          <h2 className="font-semibold">{level.name}</h2>
          <p>
            Fees: {level.fee_amount} {level.currency}
          </p>
        </div>
      ))}

      <button
        onClick={handleJoin}
        className="bg-black text-white px-6 py-2 rounded-lg"
      >
        Join Tournament
      </button>
    </div>
  )
}
