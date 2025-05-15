import type { Metadata } from "next"
import StakingDashboard from "@/components/staking/dashboard/staking-dashboard"
import StakingHero from "@/components/staking/staking-hero"
import HowItWorks from "@/components/staking/how-it-works"

export const metadata: Metadata = {
  title: "Staking | Gold Digger",
  description: "Stake your NFTs and tokens to earn rewards",
}

export default function StakingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <StakingHero />
      <HowItWorks />
      <StakingDashboard />
    </div>
  )
}
