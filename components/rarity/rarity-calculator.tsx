"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalculatorIcon, CoinsIcon, TrendingUpIcon } from "lucide-react"

// Define the rarity tiers based on the provided information
const rarityTiers = [
  { name: "Common", probability: 0.5, multiplier: 1.0, color: "#9CA3AF", baseStakingPower: 100 },
  { name: "Uncommon", probability: 0.25, multiplier: 1.5, color: "#10B981", baseStakingPower: 100 },
  { name: "Rare", probability: 0.15, multiplier: 2.0, color: "#3B82F6", baseStakingPower: 100 },
  { name: "Epic", probability: 0.07, multiplier: 5.0, color: "#8B5CF6", baseStakingPower: 100 },
  { name: "Legendary", probability: 0.025, multiplier: 10.0, color: "#F59E0B", baseStakingPower: 100 },
  { name: "Mythic", probability: 0.005, multiplier: 20.0, color: "#EF4444", baseStakingPower: 100 },
]

// Define the crews
const crews = [
  { name: "Gold Diggers", symbol: "GOLD" },
  { name: "Jailbirds", symbol: "JAIL" },
  { name: "Syndicate", symbol: "S|" },
]

export default function RarityCalculator() {
  const [selectedRarity, setSelectedRarity] = useState("Legendary")
  const [selectedCrew, setSelectedCrew] = useState("Jailbirds")
  const [numberOfNfts, setNumberOfNfts] = useState(1)
  const [stakingDuration, setStakingDuration] = useState(30) // days
  const [missionTier, setMissionTier] = useState("Legendary")

  // Get the selected rarity tier
  const rarityTier = rarityTiers.find((tier) => tier.name === selectedRarity) || rarityTiers[0]

  // Get the selected crew
  const crew = crews.find((c) => c.name === selectedCrew) || crews[0]

  // Calculate staking power
  const stakingPower = rarityTier.baseStakingPower * rarityTier.multiplier * numberOfNfts

  // Calculate annual DIGR yield
  const annualYield = stakingPower * 0.054

  // Calculate yield for the selected duration
  const durationYield = (annualYield / 365) * stakingDuration * 0.98 // after 2% fee

  // Calculate mission bonus
  const missionBonus = stakingPower * 0.05

  // Define base mission rewards based on tier
  const missionBaseRewards = {
    Common: 50,
    Uncommon: 100,
    Rare: 200,
    Epic: 300,
    Legendary: 500,
    Mythic: 1000,
  }

  // Calculate total mission reward
  const missionBaseReward = missionBaseRewards[missionTier as keyof typeof missionBaseRewards]
  const totalMissionReward = missionBaseReward + missionBonus

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Rarity Rewards Calculator</h1>
      <p className="text-muted-foreground mb-6">
        Calculate potential DIGR rewards based on NFT rarity, staking duration, and missions
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="border-gold-300/10">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalculatorIcon className="mr-2 h-5 w-5 text-gold-300" />
                Calculator Settings
              </CardTitle>
              <CardDescription>Adjust parameters to calculate potential rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="rarity">NFT Rarity</Label>
                <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                  <SelectTrigger id="rarity">
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {rarityTiers.map((tier) => (
                      <SelectItem key={tier.name} value={tier.name}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tier.color }}></div>
                          {tier.name} ({tier.multiplier.toFixed(1)}x)
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crew">NFT Crew</Label>
                <Select value={selectedCrew} onValueChange={setSelectedCrew}>
                  <SelectTrigger id="crew">
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

              <div className="space-y-2">
                <Label htmlFor="nfts">Number of NFTs</Label>
                <Input
                  id="nfts"
                  type="number"
                  min="1"
                  max="100"
                  value={numberOfNfts}
                  onChange={(e) => setNumberOfNfts(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="duration">Staking Duration (days)</Label>
                  <span className="text-sm text-muted-foreground">{stakingDuration} days</span>
                </div>
                <Slider
                  id="duration"
                  min={1}
                  max={365}
                  step={1}
                  value={[stakingDuration]}
                  onValueChange={(value) => setStakingDuration(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mission">Mission Tier</Label>
                <Select value={missionTier} onValueChange={setMissionTier}>
                  <SelectTrigger id="mission">
                    <SelectValue placeholder="Select mission tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {rarityTiers.map((tier) => (
                      <SelectItem key={tier.name} value={tier.name}>
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tier.color }}></div>
                          {tier.name} Mission
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="staking" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="staking">Staking Rewards</TabsTrigger>
              <TabsTrigger value="mission">Mission Rewards</TabsTrigger>
              <TabsTrigger value="combined">Combined Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="staking">
              <Card className="border-gold-300/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CoinsIcon className="mr-2 h-5 w-5 text-gold-300" />
                    Staking Rewards Calculation
                  </CardTitle>
                  <CardDescription>
                    Estimated DIGR rewards for staking your NFTs for {stakingDuration} days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gold-300/5 p-4 rounded-md border border-gold-300/10">
                        <p className="text-sm text-muted-foreground mb-1">Total Staking Power</p>
                        <p className="text-2xl font-bold">
                          {stakingPower} {crew.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {numberOfNfts} {rarityTier.name} NFT{numberOfNfts > 1 ? "s" : ""} × {rarityTier.multiplier}x
                          multiplier
                        </p>
                      </div>

                      <div className="bg-gold-300/5 p-4 rounded-md border border-gold-300/10">
                        <p className="text-sm text-muted-foreground mb-1">Annual DIGR Yield</p>
                        <p className="text-2xl font-bold">{annualYield.toFixed(2)} DIGR</p>
                        <p className="text-xs text-muted-foreground mt-1">At 5.4% annual rate (before ecosystem fee)</p>
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Estimated Rewards for {stakingDuration} Days</h3>
                        <div
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ backgroundColor: rarityTier.color, color: "white" }}
                        >
                          {rarityTier.name}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-4xl font-bold mb-2">{durationYield.toFixed(4)} DIGR</p>
                        <p className="text-sm text-muted-foreground">After 2% ecosystem fee</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Daily Yield</p>
                            <p className="font-medium">{((annualYield / 365) * 0.98).toFixed(4)} DIGR/day</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Per-Epoch Yield</p>
                            <p className="font-medium">{((annualYield / 146) * 0.98).toFixed(4)} DIGR/epoch</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mission">
              <Card className="border-gold-300/10">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUpIcon className="mr-2 h-5 w-5 text-gold-300" />
                    Mission Rewards Calculation
                  </CardTitle>
                  <CardDescription>Estimated DIGR rewards for completing a {missionTier} mission</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gold-300/5 p-4 rounded-md border border-gold-300/10">
                        <p className="text-sm text-muted-foreground mb-1">Mission Bonus</p>
                        <p className="text-2xl font-bold">{missionBonus.toFixed(2)} DIGR</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on {stakingPower} {crew.symbol} staking power
                        </p>
                      </div>

                      <div className="bg-gold-300/5 p-4 rounded-md border border-gold-300/10">
                        <p className="text-sm text-muted-foreground mb-1">Base Mission Reward</p>
                        <p className="text-2xl font-bold">{missionBaseReward} DIGR</p>
                        <p className="text-xs text-muted-foreground mt-1">Standard reward for {missionTier} mission</p>
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Total Mission Reward</h3>
                        <div
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: rarityTiers.find((t) => t.name === missionTier)?.color || "#000000",
                            color: "white",
                          }}
                        >
                          {missionTier} Mission
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-4xl font-bold mb-2">{totalMissionReward.toFixed(2)} DIGR</p>
                        <p className="text-sm text-muted-foreground">Base reward + staking power bonus</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Bonus Percentage</p>
                            <p className="font-medium">
                              {((missionBonus / missionBaseReward) * 100).toFixed(1)}% increase
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Bonus Formula</p>
                            <p className="font-medium text-xs font-mono">Staking Power × 0.05</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="combined">
              <Card className="border-gold-300/10">
                <CardHeader>
                  <CardTitle>Combined Rewards Summary</CardTitle>
                  <CardDescription>Total potential rewards from both staking and missions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gold-300/5 p-4 rounded-md border border-gold-300/10">
                        <p className="text-sm text-muted-foreground mb-1">Staking Rewards</p>
                        <p className="text-2xl font-bold">{durationYield.toFixed(4)} DIGR</p>
                        <p className="text-xs text-muted-foreground mt-1">For {stakingDuration} days of staking</p>
                      </div>

                      <div className="bg-gold-300/5 p-4 rounded-md border border-gold-300/10">
                        <p className="text-sm text-muted-foreground mb-1">Mission Rewards</p>
                        <p className="text-2xl font-bold">{totalMissionReward.toFixed(2)} DIGR</p>
                        <p className="text-xs text-muted-foreground mt-1">For one {missionTier} mission</p>
                      </div>
                    </div>

                    <div className="bg-card p-6 rounded-lg border border-border">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Total Combined Rewards</h3>
                        <div
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{ backgroundColor: rarityTier.color, color: "white" }}
                        >
                          {rarityTier.name} NFT{numberOfNfts > 1 ? "s" : ""}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-4xl font-bold mb-2">
                          {(durationYield + totalMissionReward).toFixed(2)} DIGR
                        </p>
                        <p className="text-sm text-muted-foreground">Staking + one mission</p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm mb-2">
                          With {numberOfNfts} {rarityTier.name} NFT{numberOfNfts > 1 ? "s" : ""} from the {selectedCrew}{" "}
                          crew, you can earn:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-sm">
                          <li>
                            <strong>{durationYield.toFixed(4)} DIGR</strong> from {stakingDuration} days of staking
                          </li>
                          <li>
                            <strong>{totalMissionReward.toFixed(2)} DIGR</strong> from completing a {missionTier}{" "}
                            mission
                          </li>
                          <li>Additional rewards from multiple missions during the staking period</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
