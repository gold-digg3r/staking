import type React from "react"
import type { Metadata } from "next"
import { StakingNavigation } from "@/components/staking/staking-navigation"

export const metadata: Metadata = {
  title: "Staking | Gold Digger",
  description: "Stake your NFTs and tokens to earn rewards",
}

export default function StakingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <StakingNavigation />
        {children}
      </div>
    </div>
  )
}
