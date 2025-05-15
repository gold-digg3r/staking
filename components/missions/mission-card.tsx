"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Mission } from "@/lib/missions/types"
import { useMission } from "@/lib/missions/context"
import Image from "next/image"
import { Clock, Award, TrendingUp, Gem } from "lucide-react"

interface MissionCardProps {
  mission: Mission
}

export function MissionCard({ mission }: MissionCardProps) {
  const { selectMission } = useMission()

  // Get badge color based on difficulty
  const getBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "Common":
        return "bg-gray-500 hover:bg-gray-600"
      case "Uncommon":
        return "bg-green-500 hover:bg-green-600"
      case "Rare":
        return "bg-blue-500 hover:bg-blue-600"
      case "Epic":
        return "bg-purple-500 hover:bg-purple-600"
      case "Legendary":
        return "bg-amber-500 hover:bg-amber-600"
      case "Mythic":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gold-300/10">
      <div className="relative h-48 w-full">
        <Image src={mission.image || "/placeholder.svg"} alt={mission.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <Badge className={`${getBadgeColor(mission.difficulty)} text-white`}>{mission.difficulty}</Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle>{mission.name}</CardTitle>
        <CardDescription>{mission.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-gold-300" />
            <span>Success: {mission.baseSuccess}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Gem className="h-4 w-4 text-gold-300" />
            <span>Reward: {mission.baseReward} DIGR</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-gold-300" />
            <span>Points: {mission.leaderboardPoints}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gold-300" />
            <span>Cooldown: {mission.cooldownHours}h</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-1">Required Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {mission.requiredSkills.map((skill) => (
              <Badge key={skill} variant="outline" className="capitalize">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {mission.dropChance > 0 && (
          <div className="mt-2 text-sm flex items-center">
            <span className="text-gold-300 font-medium">NFT Drop Chance: {mission.dropChance}%</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-gold-300 hover:bg-gold-300/90 text-black" onClick={() => selectMission(mission)}>
          Select Mission
        </Button>
      </CardFooter>
    </Card>
  )
}
