"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

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

export default function RarityGuide() {
  // Calculate annual DIGR yield based on staking power
  const calculateAnnualYield = (stakingPower: number) => {
    return stakingPower * 0.054
  }

  // Calculate per-epoch yield (after fee)
  const calculateEpochYield = (stakingPower: number) => {
    const annualYield = calculateAnnualYield(stakingPower)
    const epochYield = annualYield / 146
    return epochYield * 0.98
  }

  // Calculate mission bonus
  const calculateMissionBonus = (stakingPower: number) => {
    return stakingPower * 0.05
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Rarity Multipliers Guide</h1>
      <p className="text-muted-foreground mb-6">
        Understanding how rarity affects staking power and rewards in the Gold Diggers ecosystem
      </p>

      <Alert className="mb-6 border-gold-300/30 bg-gold-300/5">
        <InfoIcon className="h-4 w-4 text-gold-300" />
        <AlertTitle>Current Staking Information</AlertTitle>
        <AlertDescription>
          As of May 15, 2025, the annual DIGR yield rate is 5.4% with rewards distributed across 146 epochs per year. A
          2% ecosystem fee is applied to all staking rewards.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tiers">Rarity Tiers</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="missions">Mission Bonuses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>What Are Rarity Multipliers?</CardTitle>
              <CardDescription>
                Rarity multipliers determine the staking power of each NFT, directly impacting DIGR yield and mission
                rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  In the Gold Diggers ecosystem, rarity multipliers are numerical factors assigned to NFTs based on
                  their rarity tier. They scale the base staking power of an NFT (100 for all NFTs), which influences
                  both:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Passive DIGR yield</strong> earned through staking
                  </li>
                  <li>
                    <strong>Mission reward bonuses</strong> when NFTs are sent on missions
                  </li>
                </ul>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">How It Works</h3>
                  <div className="bg-card p-4 rounded-md border border-border">
                    <p className="font-mono text-sm">
                      Total Staking Power = Base Staking Power (100) × Rarity Multiplier
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {crews.map((crew) => (
                    <Card key={crew.name} className="border-gold-300/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{crew.name}</CardTitle>
                        <Badge variant="outline" className="border-gold-300/30 text-gold-300">
                          {crew.symbol}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          All {crew.name} NFTs use the same rarity multiplier system, with staking power measured in{" "}
                          {crew.symbol}.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiers">
          <Card>
            <CardHeader>
              <CardTitle>Rarity Tiers and Multipliers</CardTitle>
              <CardDescription>
                The ecosystem defines six rarity tiers, each with a specific multiplier, probability, and color
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rarity Tier</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Multiplier</TableHead>
                    <TableHead>Total Staking Power</TableHead>
                    <TableHead>Color</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rarityTiers.map((tier) => (
                    <TableRow key={tier.name}>
                      <TableCell>
                        <div className="font-medium">{tier.name}</div>
                      </TableCell>
                      <TableCell>{(tier.probability * 100).toFixed(1)}%</TableCell>
                      <TableCell>{tier.multiplier.toFixed(1)}x</TableCell>
                      <TableCell>{tier.baseStakingPower * tier.multiplier}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: tier.color }}></div>
                          <span className="text-xs font-mono">{tier.color}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Probability</h3>
                  <p className="text-sm text-muted-foreground">
                    The likelihood of minting an NFT of that rarity. For example, there's a 50% chance of minting a
                    Common NFT, but only a 0.5% chance of minting a Mythic NFT.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Multiplier</h3>
                  <p className="text-sm text-muted-foreground">
                    The factor applied to the base staking power (100) to determine the NFT's total staking power in
                    crew-specific symbols (GOLD, JAIL, S|).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Staking Reward Examples</CardTitle>
              <CardDescription>See how rarity multipliers affect DIGR yield for different NFTs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Character Example</TableHead>
                    <TableHead>Rarity</TableHead>
                    <TableHead>Staking Power</TableHead>
                    <TableHead>Annual DIGR Yield</TableHead>
                    <TableHead>Per-Epoch DIGR Yield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Gina Diggers (GOLD)</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-white" style={{ backgroundColor: rarityTiers[0].color }}>
                        Common
                      </Badge>
                    </TableCell>
                    <TableCell>100 GOLD</TableCell>
                    <TableCell>{calculateAnnualYield(100).toFixed(2)} DIGR</TableCell>
                    <TableCell>{calculateEpochYield(100).toFixed(4)} DIGR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Sunny Rodriguez (S|)</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-white" style={{ backgroundColor: rarityTiers[1].color }}>
                        Uncommon
                      </Badge>
                    </TableCell>
                    <TableCell>150 S|</TableCell>
                    <TableCell>{calculateAnnualYield(150).toFixed(2)} DIGR</TableCell>
                    <TableCell>{calculateEpochYield(150).toFixed(4)} DIGR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Nico Falco (S|)</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-white" style={{ backgroundColor: rarityTiers[2].color }}>
                        Rare
                      </Badge>
                    </TableCell>
                    <TableCell>200 S|</TableCell>
                    <TableCell>{calculateAnnualYield(200).toFixed(2)} DIGR</TableCell>
                    <TableCell>{calculateEpochYield(200).toFixed(4)} DIGR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Lena Rossi (S|)</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-white" style={{ backgroundColor: rarityTiers[3].color }}>
                        Epic
                      </Badge>
                    </TableCell>
                    <TableCell>500 S|</TableCell>
                    <TableCell>{calculateAnnualYield(500).toFixed(2)} DIGR</TableCell>
                    <TableCell>{calculateEpochYield(500).toFixed(4)} DIGR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Victor Moretti (S|)</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-white" style={{ backgroundColor: rarityTiers[4].color }}>
                        Legendary
                      </Badge>
                    </TableCell>
                    <TableCell>1000 S|</TableCell>
                    <TableCell>{calculateAnnualYield(1000).toFixed(2)} DIGR</TableCell>
                    <TableCell>{calculateEpochYield(1000).toFixed(4)} DIGR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Mythic Gina (Hypothetical)</div>
                    </TableCell>
                    <TableCell>
                      <Badge className="text-white" style={{ backgroundColor: rarityTiers[5].color }}>
                        Mythic
                      </Badge>
                    </TableCell>
                    <TableCell>2000 GOLD</TableCell>
                    <TableCell>{calculateAnnualYield(2000).toFixed(2)} DIGR</TableCell>
                    <TableCell>{calculateEpochYield(2000).toFixed(4)} DIGR</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6 p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                <h3 className="text-lg font-medium mb-2">Yield Calculation</h3>
                <div className="space-y-2 text-sm">
                  <p className="font-mono">Annual DIGR Yield = Total Staking Power × 0.054</p>
                  <p className="font-mono">Per-Epoch DIGR Yield = Annual DIGR Yield ÷ 146</p>
                  <p className="font-mono">
                    Final Per-Epoch DIGR Yield = Per-Epoch DIGR Yield × 0.98 (after 2% ecosystem fee)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions">
          <Card>
            <CardHeader>
              <CardTitle>Mission Bonuses</CardTitle>
              <CardDescription>
                Rarity multipliers also affect mission rewards through staking power bonuses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  When you send your NFTs on missions, their staking power provides a bonus to the mission rewards. The
                  higher the rarity, the greater the bonus.
                </p>

                <div className="bg-card p-4 rounded-md border border-border">
                  <p className="font-mono text-sm">Mission Bonus (DIGR) = Total Staking Power × 0.05</p>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rarity</TableHead>
                      <TableHead>Staking Power</TableHead>
                      <TableHead>Mission Bonus</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rarityTiers.map((tier) => {
                      const stakingPower = tier.baseStakingPower * tier.multiplier
                      return (
                        <TableRow key={tier.name}>
                          <TableCell>
                            <Badge className="text-white" style={{ backgroundColor: tier.color }}>
                              {tier.name}
                            </Badge>
                          </TableCell>
                          <TableCell>{stakingPower}</TableCell>
                          <TableCell>{calculateMissionBonus(stakingPower).toFixed(1)} DIGR</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Example Mission Scenario</h3>
                  <Card className="border-gold-300/10">
                    <CardContent className="pt-6">
                      <p className="mb-4">
                        <strong>Mission:</strong> Victor Moretti (Legendary, 1000 S|) and Goldie Jenkins (Legendary,
                        1000 JAIL) team up for a Legendary heist.
                      </p>
                      <ul className="space-y-2 list-disc pl-6">
                        <li>Total Staking Power: 1000 + 1000 = 2000</li>
                        <li>Bonus: 2000 × 0.05 = 100 DIGR</li>
                        <li>Base Mission Reward: 500 DIGR</li>
                        <li>Total Mission Reward: 500 DIGR (base) + 100 DIGR (bonus) = 600 DIGR</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
