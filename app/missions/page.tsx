"use client"

import { MissionProvider } from "@/lib/missions/context"
import { MissionList } from "@/components/missions/mission-list"
import { TeamSelection } from "@/components/missions/team-selection"
import { MissionResult } from "@/components/missions/mission-result"
import { MissionHistory } from "@/components/missions/mission-history"
import { Leaderboard } from "@/components/missions/leaderboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMission } from "@/lib/missions/context"

function MissionsContent() {
  const { state } = useMission()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Missions</h1>
      <p className="text-muted-foreground mb-6">
        Deploy your NFTs on missions to earn DIGR, rare NFT drops, and leaderboard points
      </p>

      {state.missionResult ? (
        <MissionResult />
      ) : state.selectedMission ? (
        <TeamSelection />
      ) : (
        <Tabs defaultValue="available">
          <TabsList className="mb-6">
            <TabsTrigger value="available">Available Missions</TabsTrigger>
            <TabsTrigger value="history">Mission History</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <MissionList />
          </TabsContent>

          <TabsContent value="history">
            <MissionHistory />
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

export default function MissionsPage() {
  return (
    <MissionProvider>
      <MissionsContent />
    </MissionProvider>
  )
}
