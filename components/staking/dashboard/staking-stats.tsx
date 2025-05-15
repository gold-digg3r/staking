"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TokenIcon } from "@/components/ui/token-icon"
import { getStakingStats } from "@/app/actions/staking-actions"
import { TrendingUp, Coins, Clock, Gem } from "lucide-react"

interface StakingStatsProps {
  walletAddress?: string
}

export function StakingStats({ walletAddress }: StakingStatsProps) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (walletAddress) {
          const data = await getStakingStats(walletAddress)
          setStats(data)
        } else {
          // Mock data for demo
          setStats({
            total_staked: 5,
            total_rewards: 250,
            total_claimed: 100,
            total_pending: 150,
            apr: "12.5%",
            lock_period: "30 days",
          })
        }
      } catch (error) {
        console.error("Error fetching staking stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [walletAddress])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Staked"
        value={loading ? null : `${stats?.total_staked} NFTs`}
        icon={<Coins className="h-5 w-5 text-gold-500" />}
        isLoading={loading}
      />
      <StatsCard
        title="Total Rewards"
        value={loading ? null : `${stats?.total_rewards} DIGR`}
        icon={<Gem className="h-5 w-5 text-gold-500" />}
        isLoading={loading}
        tokenSymbol="DIGR"
      />
      <StatsCard
        title="Current APR"
        value={loading ? null : stats?.apr}
        icon={<TrendingUp className="h-5 w-5 text-gold-500" />}
        isLoading={loading}
      />
      <StatsCard
        title="Lock Period"
        value={loading ? null : stats?.lock_period}
        icon={<Clock className="h-5 w-5 text-gold-500" />}
        isLoading={loading}
      />
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: string | null
  icon: React.ReactNode
  isLoading?: boolean
  tokenSymbol?: string
}

function StatsCard({ title, value, icon, isLoading = false, tokenSymbol }: StatsCardProps) {
  return (
    <Card className="border-gold-500/10">
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
          <div className="p-2 rounded-full bg-gold-500/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
