"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, Clock, TrendingUp, Users, Star, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Mock data for demonstration
const nftPools = [
  {
    id: "gold-diggers",
    name: "Gold Diggers",
    apr: "12%",
    lockPeriod: "30 days",
    totalStaked: 1245,
    minStake: 1,
    rewards: "DIGR",
    image: "/characters/blackstone.png",
    featured: true,
    icon: <Coins className="h-5 w-5" />,
  },
  {
    id: "jailbirds",
    name: "Jailbirds",
    apr: "8%",
    lockPeriod: "14 days",
    totalStaked: 876,
    minStake: 1,
    rewards: "DIGR",
    image: "/characters/martinez.png",
    featured: false,
    icon: <Shield className="h-5 w-5" />,
  },
  {
    id: "syndicate",
    name: "Syndicate",
    apr: "15%",
    lockPeriod: "60 days",
    totalStaked: 532,
    minStake: 1,
    rewards: "DIGR + GOLD",
    image: "/characters/darkheart.png",
    featured: true,
    icon: <Zap className="h-5 w-5" />,
  },
]

const tokenPools = [
  {
    id: "digr-staking",
    name: "DIGR Staking",
    apr: "18%",
    lockPeriod: "90 days",
    totalStaked: "1.2M DIGR",
    minStake: "100 DIGR",
    rewards: "DIGR",
    image: "/token.png",
    featured: true,
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: "gold-staking",
    name: "GOLD Staking",
    apr: "10%",
    lockPeriod: "30 days",
    totalStaked: "450K GOLD",
    minStake: "50 GOLD",
    rewards: "GOLD",
    image: "/sol.png",
    featured: false,
    icon: <Coins className="h-5 w-5" />,
  },
]

export function StakingPoolsList() {
  const [activeTab, setActiveTab] = useState("nft-pools")

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="nft-pools" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 p-1 bg-gold-50 dark:bg-neutral-800/30">
          <TabsTrigger
            value="nft-pools"
            className="text-base py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-gold-600 dark:data-[state=active]:text-gold-300"
          >
            NFT Pools
          </TabsTrigger>
          <TabsTrigger
            value="token-pools"
            className="text-base py-3 data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:text-gold-600 dark:data-[state=active]:text-gold-300"
          >
            Token Pools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nft-pools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nftPools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} type="nft" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="token-pools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tokenPools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} type="token" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PoolCardProps {
  pool: any
  type: "nft" | "token"
}

function PoolCard({ pool, type }: PoolCardProps) {
  return (
    <Card className="overflow-hidden border-2 border-neutral-200 dark:border-neutral-800 hover:border-gold-300/70 transition-all duration-300 hover:shadow-lg hover:shadow-gold-300/10 bg-white dark:bg-neutral-900">
      {pool.featured && (
        <div className="bg-gradient-to-r from-gold-400 to-gold-300 text-black text-xs font-bold px-3 py-1.5 text-center uppercase tracking-wider">
          FEATURED POOL
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="relative w-14 h-14 mr-4 rounded-lg overflow-hidden border-2 border-neutral-200 dark:border-neutral-700">
            <Image
              src={pool.image || "/placeholder.svg?height=56&width=56&query=token"}
              alt={pool.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center">
              <span className="mr-2 text-gold-400 dark:text-gold-300">{pool.icon}</span>
              {pool.name}
            </CardTitle>
            <CardDescription>Earn {pool.rewards} tokens</CardDescription>
          </div>
          <Badge
            variant="outline"
            className="border-gold-300/30 bg-gold-50 text-gold-700 dark:bg-gold-900/20 dark:text-gold-300 dark:border-gold-800/50"
          >
            {pool.apr} APR
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div className="flex items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
            <Clock className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            <span>{pool.lockPeriod} lock</span>
          </div>
          <div className="flex items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
            <Users className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            <span>{pool.totalStaked} staked</span>
          </div>
          <div className="flex items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
            <Coins className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            <span>Min: {pool.minStake}</span>
          </div>
          <div className="flex items-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
            <TrendingUp className="h-4 w-4 mr-2 text-neutral-500 dark:text-neutral-400" />
            <span>Daily rewards</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link href={`/staking/pools/${pool.id}`} className="flex-1">
          <Button
            variant="default"
            className="w-full bg-gold-400 hover:bg-gold-500 text-black dark:bg-gold-500 dark:hover:bg-gold-400"
          >
            View Pool
          </Button>
        </Link>
        <Button
          variant="outline"
          className="border-gold-300 text-gold-700 hover:bg-gold-50 dark:text-gold-300 dark:hover:bg-gold-900/20"
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  )
}
