import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenStakingForm } from "@/components/staking/token-staking/token-staking-form"
import { StakingAnalyticsDashboard } from "@/components/staking/analytics/staking-analytics-dashboard"
import { RewardsCalculator } from "@/components/staking/rewards-calculator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Staking Features | Gold Digger",
  description: "Advanced staking features including token staking, analytics, and rewards calculator",
}

export default function StakingFeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Staking Features</h1>
        <p className="text-muted-foreground">Advanced staking features for the Gold Digger ecosystem</p>
      </div>

      <Tabs defaultValue="token-staking" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="token-staking">Token Staking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calculator">Rewards Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="token-staking" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TokenStakingForm />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Token Staking</h2>
              <p>
                Stake your DIGR and GOLD tokens to earn passive rewards. Token staking offers flexible durations and
                competitive APR rates.
              </p>
              <h3 className="text-xl font-semibold mt-6">Benefits</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Earn up to 18% APR on your staked tokens</li>
                <li>Choose from multiple staking durations</li>
                <li>Compound your rewards for maximum growth</li>
                <li>Unlock premium features with higher staking amounts</li>
              </ul>
              <h3 className="text-xl font-semibold mt-6">How It Works</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Select the token you want to stake</li>
                <li>Choose the amount and staking duration</li>
                <li>Confirm the transaction with your wallet</li>
                <li>Earn rewards based on your staking parameters</li>
                <li>Claim or compound your rewards at any time</li>
              </ol>

              <div className="mt-8">
                <Button asChild className="bg-gold-600 hover:bg-gold-700 text-black">
                  <Link href="/staking/features/token-staking">
                    View Full Token Staking Page <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <StakingAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="calculator" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RewardsCalculator />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Rewards Calculator</h2>
              <p>
                Estimate your potential staking rewards based on asset type, amount, duration, and rarity. Our
                calculator helps you optimize your staking strategy for maximum returns.
              </p>
              <h3 className="text-xl font-semibold mt-6">Factors Affecting Rewards</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Asset Type:</span> Different NFT collections and tokens have different
                  base APR rates
                </li>
                <li>
                  <span className="font-medium">Rarity:</span> Higher rarity NFTs earn higher rewards (up to 10x for
                  Mythic)
                </li>
                <li>
                  <span className="font-medium">Duration:</span> Longer staking periods provide APR bonuses
                </li>
                <li>
                  <span className="font-medium">Amount:</span> The number of NFTs or token amount directly affects your
                  rewards
                </li>
              </ul>
              <h3 className="text-xl font-semibold mt-6">Rarity Multipliers</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-gold-500/5 p-2 rounded-md">
                  <span className="font-medium">Common:</span> 1x
                </div>
                <div className="bg-gold-500/5 p-2 rounded-md">
                  <span className="font-medium">Uncommon:</span> 1.5x
                </div>
                <div className="bg-gold-500/5 p-2 rounded-md">
                  <span className="font-medium">Rare:</span> 2x
                </div>
                <div className="bg-gold-500/5 p-2 rounded-md">
                  <span className="font-medium">Epic:</span> 3x
                </div>
                <div className="bg-gold-500/5 p-2 rounded-md">
                  <span className="font-medium">Legendary:</span> 5x
                </div>
                <div className="bg-gold-500/5 p-2 rounded-md">
                  <span className="font-medium">Mythic:</span> 10x
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
