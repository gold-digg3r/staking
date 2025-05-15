import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function StakingHero() {
  return (
    <div className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Stake Your NFTs & Earn Rewards
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Earn passive income by staking your Gold Digger NFTs in our high-yield staking pools
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/staking/pools">
                Explore Staking Pools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/marketplace">Get NFTs</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
