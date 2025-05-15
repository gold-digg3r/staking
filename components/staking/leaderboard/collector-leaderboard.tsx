"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import type { CollectorLeaderboardEntry } from "@/types/leaderboard"

export default function CollectorLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<CollectorLeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard?type=collectors")
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data")
        }
        const data = await response.json()
        setLeaderboard(data.leaderboard || [])
      } catch (error) {
        console.error("Error fetching leaderboard:", error)
        toast({
          title: "Error",
          description: "Failed to load leaderboard data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [toast])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-7 w-1/3 mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (leaderboard.length === 0) {
    return (
      <Card className="text-center p-8">
        <CardTitle className="mb-2">No Leaderboard Data</CardTitle>
        <CardDescription>
          There is currently no collector leaderboard data available. Start collecting NFTs to appear on the
          leaderboard!
        </CardDescription>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Collectors</CardTitle>
        <CardDescription>The most active collectors in the Gold Digger ecosystem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.map((entry, index) => (
            <div key={entry.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`font-bold ${index < 3 ? "text-amber-500" : "text-muted-foreground"}`}>
                  #{index + 1}
                </span>
                <Avatar>
                  <AvatarImage src={entry.avatarUrl || "/placeholder.svg"} alt={entry.username} />
                  <AvatarFallback>{entry.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{entry.username}</div>
                  {entry.badges && entry.badges.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {entry.badges.map((badge, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="font-medium">{entry.nftCount} NFTs</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
