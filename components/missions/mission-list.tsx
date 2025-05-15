"use client"

import { useMission } from "@/lib/missions/context"
import { MissionCard } from "./mission-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import type { MissionDifficulty } from "@/lib/missions/types"

export function MissionList() {
  const { state } = useMission()
  const [filter, setFilter] = useState<MissionDifficulty | "All">("All")

  const filteredMissions = state.availableMissions.filter(
    (mission) => filter === "All" || mission.difficulty === filter,
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="All" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid grid-cols-7">
          <TabsTrigger value="All">All</TabsTrigger>
          <TabsTrigger value="Common">Common</TabsTrigger>
          <TabsTrigger value="Uncommon">Uncommon</TabsTrigger>
          <TabsTrigger value="Rare">Rare</TabsTrigger>
          <TabsTrigger value="Epic">Epic</TabsTrigger>
          <TabsTrigger value="Legendary">Legendary</TabsTrigger>
          <TabsTrigger value="Mythic">Mythic</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredMissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No missions available with the selected filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      )}
    </div>
  )
}
