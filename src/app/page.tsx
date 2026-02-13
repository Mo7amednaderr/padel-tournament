import Link from 'next/link'
import { Card, CardBody } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <Card>
      <CardBody className="space-y-4">
        <h1 className="text-3xl font-bold">Padel Tournament Platform</h1>
        <p className="opacity-80">
          Create account, join tournaments, and follow live updates.
        </p>

        <div className="flex gap-3">
          <Link href="/auth/sign-up"><Button>Create account</Button></Link>
          <Link href="/auth/sign-in"><Button variant="secondary">Sign in</Button></Link>
        </div>
      </CardBody>
    </Card>
  )
}
