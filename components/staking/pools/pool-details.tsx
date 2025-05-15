"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { StakeNftDialog } from "@/components/staking/stake-nft-dialog"
import type { StakingPool } from "@/types/staking"

interface PoolDetailsProps {
  poolId: string
}

export default function PoolDetails({ poolId }: PoolDetailsProps) {
  const [pool, setPool] = useState<StakingPool | null>(null)
  const [loading, setLoading] = useState(true)
  const [stakeDialogOpen, setStakeDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchPoolDetails = async () => {
      try {
        const response = await fetch(`/api/staking/pools/${poolId}`)
        if (response.status === 404) {
          router.push("/staking/pools/not-found")
          return
        }
        if (!response.ok) {
          throw new Error("Failed to fetch pool details")
        }
        const data = await response.json()
        setPool(data.pool)
      } catch (error) {
        console.error("Error fetching pool details:", error)
        toast({
          title: "Error",
          description: "Failed to load pool details. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchPoolDetails()
  }, [poolId, router, toast])

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/3 mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-40 w-full" />
          </CardContent>
        </Card>

        <Skeleton className="h-10 w-full max-w-xs mx-auto" />
      </div>
    )
  }

  if (!pool) {
    return (
      <Card className="text-center p-8">
        <CardTitle className="mb-2">Pool Not Found</CardTitle>
        <CardDescription>The staking pool you're looking for doesn't exist or has been removed.</CardDescription>
        <Button onClick={() => router.push("/staking/pools")} className="mt-4">
          View All Pools
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{pool.name}</CardTitle>
              <CardDescription>{pool.description}</CardDescription>
            </div>
            <Badge variant={pool.active ? "default" : "secondary"} className="ml-2">
              {pool.active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">APR</span>
                <span className="font-medium">{pool.apr}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lock Period</span>
                <span className="font-medium">{pool.lockPeriod} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reward Token</span>
                <span className="font-medium">{pool.rewardToken}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Staked</span>
                <span className="font-medium">{pool.totalStaked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Min Stake</span>
                <span className="font-medium">{pool.minStake}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max Stake</span>
                <span className="font-medium">{pool.maxStake || "Unlimited"}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pool Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center bg-muted/20 rounded-md">
            {/* Chart would go here */}
            <p className="text-muted-foreground">Performance chart coming soon</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button size="lg" onClick={() => setStakeDialogOpen(true)} disabled={!pool.active}>
          Stake in this Pool
        </Button>
      </div>

      {pool && (
        <StakeNftDialog
          open={stakeDialogOpen}
          onOpenChange={setStakeDialogOpen}
          poolId={pool.id}
          poolName={pool.name}
        />
      )}
    </div>
  )
}
