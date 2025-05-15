import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function StakingNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-8">
        <div className="relative w-24 h-24">
          <Image src="/logo.png" alt="Gold Digger Logo" fill className="object-contain" />
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The staking page you're looking for doesn't exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild>
          <Link href="/staking/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
