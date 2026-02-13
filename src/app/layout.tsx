import './globals.css'
import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b border-black/10 bg-[rgb(var(--bg))]/80 backdrop-blur">
          <div className="container-app py-4 flex items-center justify-between">
            <Link href="/" className="tracking-tight text-lg font-semibold">
              Padel Tournament
            </Link>

            <nav className="flex items-center gap-5 text-sm text-[rgb(var(--text))]/80">
              <Link className="hover:text-[rgb(var(--text))]" href="/dashboard">Dashboard</Link>
              <Link className="hover:text-[rgb(var(--text))]" href="/tournaments">Tournaments</Link>
              <Link className="hover:text-[rgb(var(--text))]" href="/auth/sign-in">Sign in</Link>
            </nav>
          </div>
        </header>

        <main className="container-app py-10">{children}</main>

        <footer className="container-app py-10 text-sm text-[rgb(var(--muted))]">
          © {new Date().getFullYear()} Padel Tournament
        </footer>
      </body>
    </html>
  )
}
