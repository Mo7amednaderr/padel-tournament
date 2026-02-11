export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full border rounded-xl p-6 space-y-3">
        <h1 className="text-2xl font-semibold">Padel Tournament</h1>
        <p className="opacity-80">Welcome 👋</p>

        <div className="flex gap-3">
          <a className="underline" href="/auth/sign-up">Sign up</a>
          <a className="underline" href="/auth/sign-in">Sign in</a>
        </div>
      </div>
    </main>
  )
}
