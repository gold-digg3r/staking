"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { rarityTiers, crews } from "@/data/rarity-system"
import { missions } from "@/data/missions"
import { calculateMissionResult, estimateTeamPerformance } from "@/lib/missions/calculations"
import type { DeployedNFT, Mission } from "@/lib/missions/types"
import { Gem, Award, Coins, AlertCircle, CheckCircle2, XCircle } from "lucide-react"

export function MissionSimulator() {
  const [selectedMission, setSelectedMission] = useState<Mission>(missions[0])
  const [team, setTeam] = useState<DeployedNFT[]>([])
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [teamSize, setTeamSize] = useState(3)

  // Create a custom NFT
  const [nftRarity, setNftRarity] = useState("Common")
  const [nftCrew, setNftCrew] = useState("Gold Diggers")
  const [nftSkill, setNftSkill] = useState("planning")
  const [nftSkillValue, setNftSkillValue] = useState(15)
  const [nftAbility, setNftAbility] = useState("Double planning rewards")

  const addNFT = () => {
    if (team.length >= teamSize) return

    const rarityTier = rarityTiers.find((r) => r.name === nftRarity)
    if (!rarityTier) return

    const newNFT: DeployedNFT = {
      id: `custom-${Date.now()}`,
      name: `Custom ${nftRarity} ${nftCrew}`,
      rarity: nftRarity,
      stakingPower: rarityTier.baseStakingPower * rarityTier.multiplier,
      skills: [{ type: nftSkill, value: nftSkillValue }],
      specialAbility: nftAbility,
      crew: nftCrew,
      image: `/placeholder.svg?height=400&width=400&query=${nftRarity}+${nftCrew}+character`,
    }

    setTeam([...team, newNFT])
  }

  const removeNFT = (id: string) => {
    setTeam(team.filter((nft) => nft.id !== id))
  }

  const clearTeam = () => {
    setTeam([])
  }

  const runSimulation = () => {
    if (team.length === 0) return

    const result = calculateMissionResult(selectedMission, team)
    setSimulationResult(result)
  }

  const resetSimulation = () => {
    setSimulationResult(null)
  }

  // Calculate team performance
  const teamPerformance = team.length > 0 ? estimateTeamPerformance(selectedMission, team) : null

  // Get badge color based on rarity
  const getBadgeColor = (rarity: string) => {
    const tier = rarityTiers.find((r) => r.name === rarity)
    return tier ? tier.color : "#9CA3AF"
  }

  return (
    <div className="space-y-6">
      <Card className="border-gold-300/10">
        <CardHeader>
          <CardTitle>Mission Simulator</CardTitle>
          <CardDescription>Simulate missions with custom NFTs to test different strategies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!simulationResult ? (
            <>
              <div className="space-y-4">
                <h3 className="font-medium">1. Select Mission</h3>
                <Select
                  value={selectedMission.id}
                  onValueChange={(value) => {
                    const mission = missions.find((m) => m.id === value)
                    if (mission) setSelectedMission(mission)
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a mission" />
                  </SelectTrigger>
                  <SelectContent>
                    {missions.map((mission) => (
                      <SelectItem key={mission.id} value={mission.id}>
                        {mission.name} ({mission.difficulty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4">
                  <h4 className="font-medium mb-2">{selectedMission.name}</h4>
                  <p className="text-sm mb-2">{selectedMission.description}</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Difficulty:</span>{" "}
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: getBadgeColor(selectedMission.difficulty) }}
                      >
                        {selectedMission.difficulty}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Base Success:</span>{" "}
                      <span>{selectedMission.baseSuccess}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Base Reward:</span>{" "}
                      <span>{selectedMission.baseReward} DIGR</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">NFT Drop Chance:</span>{" "}
                      <span>{selectedMission.dropChance}%</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-muted-foreground text-sm">Required Skills:</span>{" "}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedMission.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="capitalize">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">2. Create Your Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">NFT Rarity</label>
                    <Select value={nftRarity} onValueChange={setNftRarity}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        {rarityTiers.map((tier) => (
                          <SelectItem key={tier.name} value={tier.name}>
                            {tier.name} ({tier.multiplier}x)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">NFT Crew</label>
                    <Select value={nftCrew} onValueChange={setNftCrew}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crew" />
                      </SelectTrigger>
                      <SelectContent>
                        {crews.map((crew) => (
                          <SelectItem key={crew.name} value={crew.name}>
                            {crew.name} ({crew.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Skill Type</label>
                    <Select value={nftSkill} onValueChange={setNftSkill}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select skill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="hacking">Hacking</SelectItem>
                        <SelectItem value="stealth">Stealth</SelectItem>
                        <SelectItem value="puzzle">Puzzle</SelectItem>
                        <SelectItem value="chaos">Chaos</SelectItem>
                        <SelectItem value="combat">Combat</SelectItem>
                        <SelectItem value="support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Skill Value: {nftSkillValue}%</label>
                    <Slider
                      value={[nftSkillValue]}
                      min={5}
                      max={30}
                      step={5}
                      onValueChange={(value) => setNftSkillValue(value[0])}
                      className="py-4"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">Special Ability</label>
                    <Select value={nftAbility} onValueChange={setNftAbility}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Double planning rewards">Double planning rewards</SelectItem>
                        <SelectItem value="Double puzzle rewards">Double puzzle rewards</SelectItem>
                        <SelectItem value="Double chaos rewards">Double chaos rewards</SelectItem>
                        <SelectItem value="Double hacking rewards">Double hacking rewards</SelectItem>
                        <SelectItem value="Double stealth rewards">Double stealth rewards</SelectItem>
                        <SelectItem value="2x planning influence">2x planning influence</SelectItem>
                        <SelectItem value="2x stealth influence">2x stealth influence</SelectItem>
                        <SelectItem value="2x hacking influence">2x hacking influence</SelectItem>
                        <SelectItem value="50% faster hacking cooldown">50% faster hacking cooldown</SelectItem>
                        <SelectItem value="50% faster stealth cooldown">50% faster stealth cooldown</SelectItem>
                        <SelectItem value="30% reduced damage for team">30% reduced damage for team</SelectItem>
                        <SelectItem value="Triple mission rewards">Triple mission rewards</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gold-300 hover:bg-gold-300/90 text-black"
                    onClick={addNFT}
                    disabled={team.length >= teamSize}
                  >
                    Add NFT to Team
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">
                      Your Team ({team.length}/{teamSize})
                    </h4>
                    {team.length > 0 && (
                      <Button variant="outline" size="sm" onClick={clearTeam}>
                        Clear Team
                      </Button>
                    )}
                  </div>

                  {team.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-gold-300/20 rounded-md">
                      <p className="text-muted-foreground">Add NFTs to your team to simulate a mission</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {team.map((nft) => (
                        <Card key={nft.id} className="border-gold-300/10">
                          <CardContent className="p-3 flex justify-between items-center">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge className="text-white" style={{ backgroundColor: getBadgeColor(nft.rarity) }}>
                                  {nft.rarity}
                                </Badge>
                                <h4 className="font-medium">{nft.name}</h4>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {nft.crew} • {nft.stakingPower} Staking Power • {nft.skills[0].type} +
                                {nft.skills[0].value}%
                              </div>
                              <div className="text-xs mt-1">{nft.specialAbility}</div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                              onClick={() => removeNFT(nft.id)}
                            >
                              Remove
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {teamPerformance && (
                  <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4">
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
                        <span className="font-medium">
                          {Math.round(teamPerformance.estimatedReward.totalDIGR)} DIGR
                        </span>
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
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {simulationResult.success ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <h3 className="font-medium">Mission Successful!</h3>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Mission Failed</h3>
                    </>
                  )}
                </div>
                <Badge variant="outline" className="border-gold-300/30 text-gold-300">
                  Roll: {simulationResult.randomRoll}/{simulationResult.successThreshold}
                </Badge>
              </div>

              {simulationResult.success ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-gold-300/10">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gold-300/10">
                          <Coins className="h-5 w-5 text-gold-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">DIGR Reward</p>
                          <p className="text-xl font-bold">{Math.round(simulationResult.rewards.totalDIGR)}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-gold-300/10">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gold-300/10">
                          <Award className="h-5 w-5 text-gold-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Leaderboard Points</p>
                          <p className="text-xl font-bold">{simulationResult.rewards.leaderboardPoints}</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-gold-300/10">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="p-2 rounded-full bg-gold-300/10">
                          <Gem className="h-5 w-5 text-gold-300" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">NFT Drop Chance</p>
                          <p className="text-xl font-bold">
                            {simulationResult.rewards.effectiveDropChance.toFixed(2)}%
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4">
                    <h3 className="font-medium mb-2">Reward Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Reward:</span>
                        <span>{simulationResult.rewards.baseDIGR} DIGR</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Ability Multipliers:</span>
                        <span>
                          +
                          {Math.round(
                            simulationResult.rewards.abilityMultipliedDIGR - simulationResult.rewards.baseDIGR,
                          )}{" "}
                          DIGR
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Staking Bonus:</span>
                        <span>+{Math.round(simulationResult.rewards.stakingBonus)} DIGR</span>
                      </div>
                      <div className="border-t border-gold-300/10 pt-2 flex justify-between font-medium">
                        <span>Total Reward:</span>
                        <span>{Math.round(simulationResult.rewards.totalDIGR)} DIGR</span>
                      </div>
                    </div>
                  </div>

                  {simulationResult.rewards.nftDropped && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Gem className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium">Rare NFT Dropped!</h3>
                      </div>
                      <p className="text-sm">
                        Congratulations! You received a {simulationResult.rewards.nftDroppedRarity} NFT from this
                        mission.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Mission Failed</h3>
                    </div>
                    <p className="text-sm">
                      Your team failed to complete the mission. The mission would be on cooldown until{" "}
                      {new Date(simulationResult.cooldownEnds || "").toLocaleString()}.
                    </p>
                  </div>

                  <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4">
                    <h3 className="font-medium mb-2">Mission Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Required Success:</span>
                        <span>{simulationResult.successThreshold}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Your Roll:</span>
                        <span>{simulationResult.randomRoll}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cooldown Duration:</span>
                        <span>{selectedMission.cooldownHours} hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          {!simulationResult ? (
            <Button
              className="w-full bg-gold-300 hover:bg-gold-300/90 text-black"
              onClick={runSimulation}
              disabled={team.length === 0}
            >
              Run Simulation
            </Button>
          ) : (
            <Button className="w-full bg-gold-300 hover:bg-gold-300/90 text-black" onClick={resetSimulation}>
              Run Another Simulation
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
