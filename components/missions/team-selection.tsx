"use client"

import { useMission } from "@/lib/missions/context"
import type { DeployedNFT } from "@/lib/missions/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { syndicateCharacters } from "@/data/syndicate-collection"
import { estimateTeamPerformance } from "@/lib/missions/calculations"
import { useState } from "react"
import Image from "next/image"
import { X, Check, AlertCircle } from "lucide-react"

export function TeamSelection() {
  const { state, selectTeam, startMission, clearSelection } = useMission()
  const [selectedNFTs, setSelectedNFTs] = useState<DeployedNFT[]>([])

  // Convert syndicate characters to deployed NFTs for demo
  const availableNFTs: DeployedNFT[] = syndicateCharacters.map((char) => ({
    id: char.id,
    name: char.name,
    rarity: char.rarity,
    stakingPower: char.stakingPower,
    skills: char.skills,
    specialAbility: char.specialAbility,
    crew: "Syndicate",
    image: char.image,
  }))

  const handleSelectNFT = (nft: DeployedNFT) => {
    if (selectedNFTs.some((selected) => selected.id === nft.id)) {
      setSelectedNFTs(selectedNFTs.filter((selected) => selected.id !== nft.id))
    } else if (selectedNFTs.length < 3) {
      setSelectedNFTs([...selectedNFTs, nft])
    }
  }

  const handleConfirmTeam = () => {
    if (selectedNFTs.length > 0 && state.selectedMission) {
      selectTeam(selectedNFTs)
    }
  }

  const handleStartMission = () => {
    if (state.selectedMission && state.selectedTeam.length > 0) {
      startMission(state.selectedMission, state.selectedTeam)
    }
  }

  const handleCancel = () => {
    clearSelection()
    setSelectedNFTs([])
  }

  // Calculate team performance if mission and team are selected
  const teamPerformance =
    state.selectedMission && selectedNFTs.length > 0
      ? estimateTeamPerformance(state.selectedMission, selectedNFTs)
      : null

  // Get badge color based on rarity
  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
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

  if (!state.selectedMission) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card className="border-gold-300/10">
        <CardHeader>
          <CardTitle>Select Your Team</CardTitle>
          <CardDescription>Choose up to 3 NFTs to send on the mission "{state.selectedMission.name}"</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {selectedNFTs.map((nft) => (
              <Card key={nft.id} className="border-gold-300/10 relative">
                <button
                  className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                  onClick={() => handleSelectNFT(nft)}
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative h-32 w-full">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm">{nft.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className={`${getBadgeColor(nft.rarity)} text-white text-xs`}>{nft.rarity}</Badge>
                    <span className="text-xs">{nft.stakingPower} S|</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground truncate">{nft.specialAbility}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {Array.from({ length: 3 - selectedNFTs.length }).map((_, index) => (
              <Card
                key={`empty-${index}`}
                className="border-dashed border-gray-300/30 flex items-center justify-center h-[160px]"
              >
                <p className="text-muted-foreground text-sm">Select NFT</p>
              </Card>
            ))}
          </div>

          {teamPerformance && (
            <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4 mb-6">
              <h3 className="font-medium mb-2">Team Performance</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Success Rate:</span>{" "}
                  <span className="font-medium">{teamPerformance.successRate}%</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Staking Power:</span>{" "}
                  <span className="font-medium">{teamPerformance.totalStakingPower}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Estimated Reward:</span>{" "}
                  <span className="font-medium">{Math.round(teamPerformance.estimatedReward.totalDIGR)} DIGR</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Effective Drop Chance:</span>{" "}
                  <span className="font-medium">{teamPerformance.effectiveDropChance.toFixed(2)}%</span>
                </div>
              </div>

              {teamPerformance.successRate < 50 && (
                <div className="flex items-center gap-2 mt-3 text-amber-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>Low success rate! Consider adding NFTs with relevant skills.</span>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-1">
            {availableNFTs.map((nft) => (
              <Card
                key={nft.id}
                className={`border-gold-300/10 cursor-pointer transition-all ${
                  selectedNFTs.some((selected) => selected.id === nft.id)
                    ? "ring-2 ring-gold-300"
                    : "hover:border-gold-300/30"
                }`}
                onClick={() => handleSelectNFT(nft)}
              >
                <div className="relative h-32 w-full">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                  {selectedNFTs.some((selected) => selected.id === nft.id) && (
                    <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm">{nft.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge className={`${getBadgeColor(nft.rarity)} text-white text-xs`}>{nft.rarity}</Badge>
                    <span className="text-xs">{nft.stakingPower} S|</span>
                  </div>
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground truncate">{nft.specialAbility}</p>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {nft.skills.map((skill) => (
                      <Badge key={skill.type} variant="outline" className="text-xs capitalize">
                        {skill.type} +{skill.value}%
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {state.selectedTeam.length > 0 ? (
            <Button className="bg-gold-300 hover:bg-gold-300/90 text-black" onClick={handleStartMission}>
              Start Mission
            </Button>
          ) : (
            <Button
              className="bg-gold-300 hover:bg-gold-300/90 text-black"
              onClick={handleConfirmTeam}
              disabled={selectedNFTs.length === 0}
            >
              Confirm Team
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
