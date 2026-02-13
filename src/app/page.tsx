import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="container-page py-14">
      <section className="card">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Where Padel <span className="text-[color:var(--brand)]">Meets</span> Structure
        </h1>
        <p className="mt-4 muted max-w-2xl">
          Create account, join tournaments, and follow live updates — all in one place.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/auth/sign-up">Get started</Link>
          <Link className="btn btn-ghost" href="/tournaments">Browse tournaments</Link>
        </div>
      </section>
    </main>
  )
}
