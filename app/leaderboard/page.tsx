import type { Metadata } from "next"
import LeaderboardHeader from "@/components/staking/leaderboard/leaderboard-header"
import UserRankCard from "@/components/staking/leaderboard/user-rank-card"
import BadgesShowcase from "@/components/staking/leaderboard/badges-showcase"

export const metadata: Metadata = {
  title: "Leaderboard | Gold Digger",
  description: "See who's leading the Gold Digger ecosystem",
}

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LeaderboardHeader />
        </div>
        <div className="space-y-6">
          <UserRankCard />
          <BadgesShowcase />
        </div>
      </div>
    </div>
  )
}
