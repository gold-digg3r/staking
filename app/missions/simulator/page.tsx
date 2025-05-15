"use client"

import { MissionProvider } from "@/lib/missions/context"
import { MissionSimulator } from "@/components/missions/mission-simulator"

export default function MissionSimulatorPage() {
  return (
    <MissionProvider>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Mission Simulator</h1>
        <p className="text-muted-foreground mb-6">
          Test different NFT combinations and strategies to optimize your mission success
        </p>

        <MissionSimulator />
      </div>
    </MissionProvider>
  )
}
