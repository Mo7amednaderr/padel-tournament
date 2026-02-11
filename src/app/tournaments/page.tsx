'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

type Tournament = {
  id: number
  title: string
  start_date: string
  location: string
  status: string
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTournaments = async () => {
      const { data } = await supabase
        .from('tournaments')
        .select('*')
        .order('start_date', { ascending: true })

      if (data) setTournaments(data)
      setLoading(false)
    }

    fetchTournaments()
  }, [])

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Available Tournaments</h1>

      {tournaments.length === 0 && (
        <p>No tournaments yet.</p>
      )}

      {tournaments.map((t) => (
        <div key={t.id} className="border p-4 rounded-xl">
          <h2 className="text-xl font-semibold">{t.title}</h2>
          <p>{t.location}</p>
          <p>{t.start_date}</p>

          <Link
            href={`/tournaments/${t.id}`}
            className="inline-block mt-3 underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}
