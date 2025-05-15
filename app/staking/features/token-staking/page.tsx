import type { Metadata } from "next"
import { TokenStakingForm } from "@/components/staking/token-staking/token-staking-form"
import { TokenStakingPositions } from "@/components/staking/token-staking/token-staking-positions"

export const metadata: Metadata = {
  title: "Token Staking | Gold Digger",
  description: "Stake your DIGR and GOLD tokens to earn rewards",
}

export default function TokenStakingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Token Staking</h1>
        <p className="text-muted-foreground">Stake your DIGR and GOLD tokens to earn rewards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TokenStakingForm />
        <TokenStakingPositions />
      </div>

      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">How Token Staking Works</h2>
        <p>
          Token staking allows you to earn passive income by locking your DIGR and GOLD tokens in staking pools. The
          longer you stake, the higher your rewards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">1. Choose Token & Duration</h3>
            <p className="text-muted-foreground">
              Select which token you want to stake (DIGR or GOLD) and choose your staking duration. Longer durations
              offer higher APR rates.
            </p>
          </div>

          <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">2. Stake Your Tokens</h3>
            <p className="text-muted-foreground">
              Confirm the transaction with your wallet. Your tokens will be locked for the selected duration, during
              which they'll earn rewards based on the APR.
            </p>
          </div>

          <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">3. Claim & Unstake</h3>
            <p className="text-muted-foreground">
              Claim your rewards at any time without unstaking. When your staking period ends, you can unstake your
              tokens and withdraw them to your wallet.
            </p>
          </div>
        </div>

        <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold mb-3">APR Rates</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background/50 p-4 rounded-md">
              <p className="font-medium">DIGR - 30 Days</p>
              <p className="text-xl font-bold text-gold-500">12% APR</p>
            </div>
            <div className="bg-background/50 p-4 rounded-md">
              <p className="font-medium">DIGR - 60 Days</p>
              <p className="text-xl font-bold text-gold-500">15% APR</p>
            </div>
            <div className="bg-background/50 p-4 rounded-md">
              <p className="font-medium">DIGR - 90 Days</p>
              <p className="text-xl font-bold text-gold-500">18% APR</p>
            </div>
            <div className="bg-background/50 p-4 rounded-md">
              <p className="font-medium">GOLD - 30 Days</p>
              <p className="text-xl font-bold text-gold-500">10% APR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
