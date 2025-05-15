"use client"

import { useMission } from "@/lib/missions/context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Gem, Award, Coins, AlertTriangle } from "lucide-react"
import Image from "next/image"

export function MissionResult() {
  const { state, clearResult } = useMission()
  const { missionResult, selectedMission } = state

  if (!missionResult || !selectedMission) {
    return null
  }

  return (
    <Card className="border-gold-300/10 overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={selectedMission.image || "/placeholder.svg"}
          alt={selectedMission.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="text-white text-xl font-bold">{selectedMission.name}</h2>
          <p className="text-white/80 text-sm">{selectedMission.difficulty} Mission</p>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            {missionResult.success ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Mission Successful!</span>
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                <span>Mission Failed</span>
              </>
            )}
          </CardTitle>
          <Badge variant="outline" className="border-gold-300/30 text-gold-300">
            Roll: {missionResult.randomRoll}/{missionResult.successThreshold}
          </Badge>
        </div>
        <CardDescription>
          {missionResult.success
            ? "Your team completed the mission successfully and earned rewards."
            : "Your team failed to complete the mission. Try again after the cooldown period."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {missionResult.success ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-gold-300/10">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gold-300/10">
                    <Coins className="h-5 w-5 text-gold-300" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">DIGR Reward</p>
                    <p className="text-xl font-bold">{Math.round(missionResult.rewards.totalDIGR)}</p>
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
                    <p className="text-xl font-bold">{missionResult.rewards.leaderboardPoints}</p>
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
                    <p className="text-xl font-bold">{missionResult.rewards.effectiveDropChance.toFixed(2)}%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4">
              <h3 className="font-medium mb-2">Reward Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Reward:</span>
                  <span>{missionResult.rewards.baseDIGR} DIGR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ability Multipliers:</span>
                  <span>
                    +{Math.round(missionResult.rewards.abilityMultipliedDIGR - missionResult.rewards.baseDIGR)} DIGR
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staking Bonus:</span>
                  <span>+{Math.round(missionResult.rewards.stakingBonus)} DIGR</span>
                </div>
                <div className="border-t border-gold-300/10 pt-2 flex justify-between font-medium">
                  <span>Total Reward:</span>
                  <span>{Math.round(missionResult.rewards.totalDIGR)} DIGR</span>
                </div>
              </div>
            </div>

            {missionResult.rewards.nftDropped && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gem className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Rare NFT Dropped!</h3>
                </div>
                <p className="text-sm">
                  Congratulations! You received a {missionResult.rewards.nftDroppedRarity} NFT from this mission.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="font-medium">Mission Failed</h3>
              </div>
              <p className="text-sm">
                Your team failed to complete the mission. The mission will be on cooldown until{" "}
                {new Date(missionResult.cooldownEnds || "").toLocaleString()}.
              </p>
            </div>

            <div className="bg-gold-300/5 border border-gold-300/10 rounded-md p-4">
              <h3 className="font-medium mb-2">Mission Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Required Success:</span>
                  <span>{missionResult.successThreshold}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your Roll:</span>
                  <span>{missionResult.randomRoll}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cooldown Duration:</span>
                  <span>{selectedMission.cooldownHours} hours</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-4">
              <h3 className="font-medium mb-2">Tips for Next Attempt</h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>Use NFTs with skills that match the mission requirements</li>
                <li>Higher rarity NFTs provide better success rates and rewards</li>
                <li>Special abilities can significantly boost your chances</li>
                <li>Consider using NFTs with cooldown reduction abilities</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-gold-300 hover:bg-gold-300/90 text-black" onClick={clearResult}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}
