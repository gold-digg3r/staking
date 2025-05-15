"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import type { UserRank } from "@/types/leaderboard"

export default function UserRankCard() {
  const [userRank, setUserRank] = useState<UserRank | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchUserRank = async () => {
      try {
        const response = await fetch("/api/leaderboard/user-rank")
        if (response.status === 401) {
          setLoading(false)
          return // User is not authenticated
        }
        if (!response.ok) {
          throw new Error("Failed to fetch user rank data")
        }
        const data = await response.json()
        setUserRank(data.userRank)
      } catch (error) {
        console.error("Error fetching user rank:", error)
        toast({
          title: "Error",
          description: "Failed to load your ranking data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchUserRank()
  }, [toast])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!userRank) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Ranking</CardTitle>
          <CardDescription>Connect your wallet to see your position on the leaderboard</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">You need to connect your wallet to view your ranking information.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Ranking</CardTitle>
        <CardDescription>Your current position on the Gold Digger leaderboard</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userRank.avatarUrl || "/placeholder.svg"} alt={userRank.username} />
            <AvatarFallback>{userRank.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-medium">{userRank.username}</h3>
            <div className="flex gap-1 mt-1">
              {userRank.badges.map((badge, i) => (
                <Badge key={i} variant="outline">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">#{userRank.stakingRank}</div>
            <div className="text-sm text-muted-foreground">Staking Rank</div>
          </div>
          <div className="bg-muted/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">#{userRank.collectorRank}</div>
            <div className="text-sm text-muted-foreground">Collector Rank</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
