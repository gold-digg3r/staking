import { useMission } from "@/lib/missions/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import type { LeaderboardEntry } from "@/lib/missions/types"

export function Leaderboard() {
  const { state } = useMission()

  const renderLeaderboardItem = (entry: LeaderboardEntry, index: number) => (
    <Card key={entry.id} className={`border-gold-300/10 ${index < 3 ? "bg-gold-300/5" : ""}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gold-300/10">
              {index === 0 ? (
                <Trophy className="h-4 w-4 text-gold-300" />
              ) : index === 1 ? (
                <Medal className="h-4 w-4 text-gold-300" />
              ) : index === 2 ? (
                <Award className="h-4 w-4 text-gold-300" />
              ) : (
                <span className="text-sm font-medium">{entry.rank}</span>
              )}
            </div>
            <div>
              <h3 className="font-medium">{entry.displayName}</h3>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{entry.walletAddress}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="font-medium">{entry.points} pts</div>
            <div className="text-xs text-gold-300">{entry.rewards} DIGR</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Card className="border-gold-300/10">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>Top performers for the week of May 15-21, 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">{state.leaderboard.map(renderLeaderboardItem)}</div>
      </CardContent>
    </Card>
  )
}
