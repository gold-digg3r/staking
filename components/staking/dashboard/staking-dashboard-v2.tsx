"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartCard } from "@/components/ui/chart-card"
import { TokenIcon } from "@/components/ui/token-icon"
import dynamic from "next/dynamic"
import { PROGRAMS } from "@/lib/constants"
import { TrendingUp, Coins, History, Gem, BarChart3, ArrowUpRight, Clock, AlertCircle, ImageIcon } from "lucide-react"
import Image from "next/image"

// Dynamically import components that use client-side features
const StakingRewardsChart = dynamic(
  () => import("@/components/staking/staking-rewards-chart").then((mod) => ({ default: mod.StakingRewardsChart })),
  { ssr: false, loading: () => <Skeleton className="h-[300px] w-full" /> },
)

const StakedNftsList = dynamic(() => import("@/components/staking/staked-nfts-list"), {
  ssr: false,
  loading: () => <StakedNftsLoading />,
})

// Mock data for demonstration
const stakingStats = {
  totalStaked: "1,245.32 DIGR",
  totalRewards: "325.75 DIGR",
  apr: "12.5%",
  lockPeriod: "30 days",
  stakedNfts: 3,
  stakedSince: "14 days",
}

export default function StakingDashboardV2() {
  const { publicKey } = useWallet()
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // Use memo for derived values to prevent unnecessary recalculations
  const isWalletConnected = useMemo(() => !!publicKey, [publicKey])

  useEffect(() => {
    // Simulate loading with a decreasing timeout for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Function to handle claiming rewards
  const handleClaimRewards = async () => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to claim rewards",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Processing...",
      description: "Claiming your rewards...",
    })

    // Simulate processing time
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Successfully claimed 25.5 DIGR rewards",
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center justify-center mb-2">
            <Coins className="h-8 w-8 text-gold-300" />
          </div>
          <span className="text-sm font-medium text-gold-300 uppercase tracking-wider mb-1">STAKING</span>
          <h1 className="text-3xl font-bold tracking-tight">Staking Dashboard</h1>
          <p className="text-muted-foreground">Manage your staked assets and track your rewards</p>
        </div>
        <div className="mt-4 md:mt-0 flex justify-center">
          <Button className="bg-gold-300 hover:bg-gold-300/90 text-black">
            <Coins className="mr-2 h-4 w-4" />
            Stake Now
          </Button>
        </div>
      </div>

      {!isWalletConnected && (
        <Card className="mb-8 border-gold-300/10 bg-gold-300/5 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <AlertCircle className="h-5 w-5 text-gold-300 mr-2" />
              <p>Connect your wallet to view your staking positions and rewards</p>
            </div>
            {/* Wallet button is in the header, so we don't need it here */}
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Total Staked"
          value={stakingStats.totalStaked}
          icon={<Coins className="h-5 w-5 text-gold-300" />}
          isLoading={isLoading}
          tokenSymbol="DIGR"
        />
        <StatsCard
          title="Pending Rewards"
          value={stakingStats.totalRewards}
          icon={<Gem className="h-5 w-5 text-gold-300" />}
          isLoading={isLoading}
          tokenSymbol="DIGR"
        />
        <StatsCard
          title="Current APR"
          value={stakingStats.apr}
          icon={<TrendingUp className="h-5 w-5 text-gold-300" />}
          isLoading={isLoading}
        />
        <StatsCard
          title="Staked NFTs"
          value={stakingStats.stakedNfts.toString()}
          icon={<BarChart3 className="h-5 w-5 text-gold-300" />}
          isLoading={isLoading}
        />
      </div>

      {/* Program Info */}
      <div className="mb-8 p-4 bg-gold-300/5 border border-gold-300/10 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Stake Pool Program</h2>
            <p className="font-mono text-xs md:text-sm break-all">{PROGRAMS.STAKE_POOL}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-gold-300/20 text-gold-300 hover:bg-gold-300/5"
            onClick={() => {
              const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
              window.open(`https://explorer.solana.com/address/${PROGRAMS.STAKE_POOL}?cluster=${network}`, "_blank")
            }}
          >
            View on Solana Explorer
          </Button>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:w-auto w-full mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="nfts">My NFTs</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <ChartCard title="Staking Performance" icon={TrendingUp} badge="Last 30 Days" isLoading={isLoading}>
                <StakingRewardsChart />
              </ChartCard>

              <Card className="border-gold-300/10 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-gold-300/20 to-gold-300/10 border-b border-gold-300/10">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl flex items-center">
                      <Gem className="mr-2 h-5 w-5 text-gold-300" />
                      Your Staked NFTs
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gold-300 hover:text-gold-300/80 hover:bg-gold-300/10"
                      onClick={() => setActiveTab("nfts")}
                    >
                      View All <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Skeleton className="h-[200px] w-full" />
                      <Skeleton className="h-[200px] w-full" />
                      <Skeleton className="h-[200px] w-full" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <NFTCard image="/placeholder-dforw.png" name="Jailbird #1234" rarity="Legendary" />
                      <NFTCard image="/placeholder-2a21v.png" name="Jailbird #5678" rarity="Rare" />
                      <NFTCard image="/placeholder-ln8mu.png" name="Jailbird #9012" rarity="Epic" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <ChartCard title="Staking Details" icon={Clock} isLoading={isLoading}>
                <div className="space-y-4">
                  <DetailItem label="Lock Period" value={stakingStats.lockPeriod} />
                  <DetailItem label="Staked Since" value={stakingStats.stakedSince} />
                  <DetailItem label="Next Reward" value="~2.5 DIGR (in 12 hours)" />
                  <DetailItem label="Early Unstake Fee" value="10%" />

                  <div className="pt-4">
                    <Button
                      className="w-full bg-gold-300 hover:bg-gold-300/90 text-black"
                      onClick={handleClaimRewards}
                      disabled={!isWalletConnected}
                    >
                      <Coins className="mr-2 h-4 w-4" />
                      Claim Rewards
                    </Button>
                  </div>
                </div>
              </ChartCard>

              <ChartCard title="Recent Activity" icon={History} isLoading={isLoading}>
                <div className="space-y-4">
                  <ActivityItem type="stake" title="Staked Jailbird #1234" time="2 days ago" amount="1 NFT" />
                  <ActivityItem type="reward" title="Reward Claimed" time="5 days ago" amount="25.5 DIGR" />
                  <ActivityItem type="unstake" title="Unstaked Jailbird #5678" time="1 week ago" amount="1 NFT" />

                  <div className="pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-gold-300 hover:text-gold-300/80 hover:bg-gold-300/10"
                      onClick={() => setActiveTab("history")}
                    >
                      View Full History
                    </Button>
                  </div>
                </div>
              </ChartCard>

              <Card className="border-gold-300/10 bg-gradient-to-br from-gold-300/30 to-gold-300/20 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative w-10 h-10">
                      <Image src="/logo.png" alt="Gold Digger Logo" fill className="object-contain" />
                    </div>
                    <Badge variant="outline" className="border-gold-300/30 text-gold-300">
                      Premium
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Upgrade to Gold Tier</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Stake 1000+ DIGR to unlock premium benefits, including higher APR and exclusive NFT drops.
                  </p>

                  <Button variant="outline" className="w-full border-gold-300/50 text-gold-300 hover:bg-gold-300/10">
                    <Gem className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="animate-in fade-in duration-300">
          <ChartCard title="Your Staked NFTs" icon={ImageIcon} isLoading={isLoading}>
            <StakedNftsList />
          </ChartCard>
        </TabsContent>

        <TabsContent value="history" className="animate-in fade-in duration-300">
          <ChartCard title="Staking History" icon={History} isLoading={isLoading}>
            <div className="space-y-4">
              <ActivityItem type="stake" title="Staked Jailbird #1234" time="2 days ago" amount="1 NFT" />
              <ActivityItem type="reward" title="Reward Claimed" time="5 days ago" amount="25.5 DIGR" />
              <ActivityItem type="unstake" title="Unstaked Jailbird #5678" time="1 week ago" amount="1 NFT" />
              <ActivityItem type="stake" title="Staked Gold Digger #4321" time="2 weeks ago" amount="1 NFT" />
              <ActivityItem type="reward" title="Reward Claimed" time="3 weeks ago" amount="18.2 DIGR" />
              <ActivityItem type="unstake" title="Unstaked Syndicate #9876" time="1 month ago" amount="1 NFT" />
            </div>
          </ChartCard>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
  isLoading?: boolean
  tokenSymbol?: string
}

function StatsCard({ title, value, icon, isLoading = false, tokenSymbol }: StatsCardProps) {
  return (
    <Card className="border-gold-300/10 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-24 mt-1" />
            ) : (
              <div className="flex items-center gap-1 mt-1">
                <p className="text-2xl font-bold">{value}</p>
                {tokenSymbol && <TokenIcon symbol={tokenSymbol} size="sm" />}
              </div>
            )}
          </div>
          <div className="p-2 rounded-full bg-gold-300/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface DetailItemProps {
  label: string
  value: string
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gold-300/10 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}

interface ActivityItemProps {
  type: "stake" | "unstake" | "reward"
  title: string
  time: string
  amount: string
}

function ActivityItem({ type, title, time, amount }: ActivityItemProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "stake":
        return "bg-green-500/10 text-green-500"
      case "unstake":
        return "bg-red-500/10 text-red-500"
      case "reward":
        return "bg-gold-300/10 text-gold-300"
    }
  }

  const getTypeIcon = () => {
    switch (type) {
      case "stake":
        return <ArrowUpRight className="h-4 w-4" />
      case "unstake":
        return <ArrowUpRight className="h-4 w-4 rotate-180" />
      case "reward":
        return <Coins className="h-4 w-4" />
    }
  }

  return (
    <div className="flex items-center">
      <div className={`p-2 rounded-full mr-3 ${getTypeStyles()}`}>{getTypeIcon()}</div>
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      <div className="font-medium">{amount}</div>
    </div>
  )
}

interface NFTCardProps {
  image: string
  name: string
  rarity: string
}

function NFTCard({ image, name, rarity }: NFTCardProps) {
  return (
    <div className="relative rounded-lg overflow-hidden aspect-square shadow-md hover:shadow-lg transition-all hover:-translate-y-1 group">
      <Image
        src={image || "/placeholder.svg"}
        alt={name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
        <p className="text-white font-medium">{name}</p>
        <p className="text-gold-300 text-sm">Rarity: {rarity}</p>
      </div>
    </div>
  )
}

function StakedNftsLoading() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4">
        <Skeleton className="h-[300px] w-full" />
      </div>
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <Skeleton className="h-[150px] w-full" />
          <Skeleton className="h-[150px] w-full" />
        </div>
      </div>
    </div>
  )
}
