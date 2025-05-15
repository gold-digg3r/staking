import { useMission } from "@/lib/missions/context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Gem } from "lucide-react"
import type { MissionHistoryEntry } from "@/lib/missions/types"

export function MissionHistory() {
  const { state } = useMission()

  // Get badge color based on difficulty
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Common":
        return "bg-gray-500"
      case "Uncommon":
        return "bg-green-500"
      case "Rare":
        return "bg-blue-500"
      case "Epic":
        return "bg-purple-500"
      case "Legendary":
        return "bg-amber-500"
      case "Mythic":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  const renderHistoryItem = (entry: MissionHistoryEntry) => (
    <Card key={entry.id} className="border-gold-300/10">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              {entry.result.success ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <h3 className="font-medium">{entry.missionName}</h3>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{formatDate(entry.timestamp)}</p>
          </div>
          <Badge className={`${getBadgeColor(entry.difficulty)} text-white`}>{entry.difficulty}</Badge>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <div>
            <span className="text-muted-foreground">Team Size:</span> <span>{entry.team.length} NFTs</span>
          </div>
          <div>
            <span className="text-muted-foreground">Points:</span> <span>{entry.result.rewards.leaderboardPoints}</span>
          </div>
          <div>
            <span className="text-muted-foreground">DIGR Reward:</span>{" "}
            <span>{Math.round(entry.result.rewards.totalDIGR)}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Success Rate:</span> <span>{entry.result.successThreshold}%</span>
          </div>
        </div>

        {entry.result.rewards.nftDropped && (
          <div className="mt-2 flex items-center gap-1 text-xs text-green-500">
            <Gem className="h-3 w-3" />
            <span>Earned {entry.result.rewards.nftDroppedRarity} NFT</span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Card className="border-gold-300/10">
      <CardHeader>
        <CardTitle>Mission History</CardTitle>
        <CardDescription>Your recent mission attempts and results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {state.completedMissions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No mission history yet. Complete missions to see your history.
            </p>
          ) : (
            state.completedMissions.map(renderHistoryItem)
          )}
        </div>
      </CardContent>
    </Card>
  )
}
