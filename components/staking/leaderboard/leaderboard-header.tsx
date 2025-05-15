import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StakingLeaderboard from "./staking-leaderboard"
import CollectorLeaderboard from "./collector-leaderboard"

export default function LeaderboardHeader() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground mt-2">See who's leading the Gold Digger ecosystem</p>
      </div>

      <Tabs defaultValue="staking" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="collectors">Collectors</TabsTrigger>
        </TabsList>
        <TabsContent value="staking">
          <StakingLeaderboard />
        </TabsContent>
        <TabsContent value="collectors">
          <CollectorLeaderboard />
        </TabsContent>
      </Tabs>
    </div>
  )
}
