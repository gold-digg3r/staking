import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

export function StakingPoolHero() {
  return (
    <div className="w-full bg-gradient-to-b from-amber-100 to-amber-50 dark:from-amber-950/30 dark:to-background py-16 px-4">
      <div className="container max-w-5xl mx-auto text-center">
        <div className="mb-3 flex justify-center">
          <Badge
            variant="outline"
            className="px-3 py-1 text-sm font-medium border-amber-300 bg-amber-100/50 text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
          >
            <TrendingUp className="h-4 w-4 mr-1.5" />
            Earn up to 18% APR
          </Badge>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300 text-transparent bg-clip-text">
          Stake Your Assets
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Earn passive income by staking your NFTs and tokens in our high-yield pools
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/staking/token-staking">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600">
              Stake Tokens
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/staking/my-stakes">
            <Button
              size="lg"
              variant="outline"
              className="border-amber-300 hover:bg-amber-100/50 dark:border-amber-800 dark:hover:bg-amber-900/20"
            >
              View My Stakes
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
