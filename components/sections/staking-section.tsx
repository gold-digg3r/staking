import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Coins, Clock } from "lucide-react"

export function StakingSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-sm font-medium border-amber-200 bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
          >
            Earn Passive Income
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stake Your Assets</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Maximize your earnings by staking your NFTs and tokens in our high-yield staking pools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StakingFeatureCard
            icon={<Shield className="h-8 w-8 text-amber-600" />}
            title="Secure Staking"
            description="Your assets remain secure and under your control while earning rewards"
          />
          <StakingFeatureCard
            icon={<Coins className="h-8 w-8 text-amber-600" />}
            title="Competitive APR"
            description="Earn up to 18% APR on your staked assets with daily rewards distribution"
          />
          <StakingFeatureCard
            icon={<Clock className="h-8 w-8 text-amber-600" />}
            title="Flexible Periods"
            description="Choose from various lock periods to match your investment strategy"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <Badge variant="gold" className="mb-4 w-fit">
                Popular
              </Badge>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Gold Diggers NFT Staking</h3>
              <p className="text-muted-foreground mb-6">
                Stake your Gold Digger NFTs to earn DIGR tokens daily. The longer you stake, the higher your rewards.
              </p>
              <ul className="space-y-3 mb-8">
                <StakingBenefitItem text="12% APR for standard staking" />
                <StakingBenefitItem text="18% APR for 90-day lock period" />
                <StakingBenefitItem text="Daily reward distribution" />
                <StakingBenefitItem text="Exclusive access to premium features" />
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link href="/staking/pools">
                  <Button variant="default" size="lg" className="bg-amber-600 hover:bg-amber-700">
                    Start Staking
                  </Button>
                </Link>
                <Link href="/staking">
                  <Button variant="outline" size="lg">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative min-h-[300px] lg:min-h-full bg-gradient-to-br from-amber-600 to-amber-400">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/characters/blackstone.png"
                    alt="Gold Digger NFT"
                    fill
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/staking">
            <Button variant="outline" size="lg">
              View All Staking Options <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function StakingFeatureCard({
  icon,
  title,
  description,
}: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function StakingBenefitItem({ text }: { text: string }) {
  return (
    <li className="flex items-center">
      <div className="mr-3 h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
        <svg
          className="h-3.5 w-3.5 text-green-600 dark:text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span>{text}</span>
    </li>
  )
}
