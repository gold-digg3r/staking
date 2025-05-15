import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PoolNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Pool Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The staking pool you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/staking/pools">View All Pools</Link>
      </Button>
    </div>
  )
}
