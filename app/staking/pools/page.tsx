import type { Metadata } from "next"
import { StakingPoolsList } from "@/components/staking/pools/staking-pools-list"
import { StakingPoolHero } from "@/components/staking/pools/staking-pool-hero"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

export const metadata: Metadata = {
  title: "Staking Pools | Gold Digger",
  description: "Explore available staking pools and their rewards",
}

export default function StakingPoolsPage() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-background">
      <StakingPoolHero />

      <div className="container max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="gold" className="px-4 py-1.5 text-sm font-medium uppercase tracking-wider shadow-sm">
            Premium Pools
          </Badge>
        </div>

        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center justify-center mb-2">
            <Coins className="h-6 w-6 text-amber-600 mr-2" />
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Staking Pools</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore available staking pools and earn rewards by staking your NFTs and tokens
          </p>
        </div>

        <StakingPoolsList />
      </div>
    </div>
  )
}
