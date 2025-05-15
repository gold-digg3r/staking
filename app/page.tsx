import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WalletMultiButton } from "@/components/solana/wallet-multi-button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Coins, Users, BarChart3, Pickaxe } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-900 dark:to-gray-800 -z-10" />
        <div className="absolute inset-0 bg-[url('/placeholder-bsp29.png')] bg-cover bg-center opacity-10 -z-10" />

        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium mb-6">
                <Coins className="w-4 h-4 mr-2" />
                <span>Powered by Solana</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-400">
                  Gold Digger
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Stake, Earn, Explore</span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                A comprehensive Solana-based platform combining NFT staking, DeFi features, and missions to create a
                unique ecosystem for crypto enthusiasts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <WalletMultiButton />
                <Button asChild variant="outline" size="lg">
                  <Link href="/staking/dashboard">
                    Explore Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex-1 relative">
              <Image
                src="/placeholder-j41as.png"
                alt="Gold Digger NFT Collection"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <Image src="/digr.svg" alt="DIGR Token" width={40} height={40} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current APY</p>
                    <p className="text-xl font-bold text-amber-600 dark:text-amber-400">5.4%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ecosystem Features</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the comprehensive features of the Gold Digger ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Coins className="h-10 w-10 text-amber-500" />}
              title="Token Staking"
              description="Stake your DIGR tokens to earn passive rewards with competitive APY rates"
              href="/staking/token-staking"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-blue-500" />}
              title="NFT Staking"
              description="Stake your Gold Digger, Jailbirds, and Syndicate NFTs to earn DIGR rewards"
              href="/staking/pools"
            />
            <FeatureCard
              icon={<Pickaxe className="h-10 w-10 text-purple-500" />}
              title="Missions"
              description="Deploy your staked NFTs on missions to earn additional rewards and rare NFTs"
              href="/missions"
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-green-500" />}
              title="Analytics"
              description="Track your staking performance, rewards, and leaderboard position"
              href="/staking/analytics"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Card className="border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <Link href={href} className="text-amber-600 dark:text-amber-400 font-medium inline-flex items-center">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
