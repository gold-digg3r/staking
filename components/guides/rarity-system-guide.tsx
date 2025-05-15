"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { rarityTiers, crews, missionTiers, specialAbilityTypes } from "@/data/rarity-system"

export default function RaritySystemGuide() {
  const [selectedTab, setSelectedTab] = useState("overview")

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
      <h1 className="text-3xl font-bold mb-2">Gold Diggers Rarity System Guide</h1>
      <p className="text-muted-foreground mb-6">
        Understanding how rarity affects staking power, rewards, and mission success in the Gold Diggers ecosystem
      </p>

      <Alert className="mb-6 border-gold-300/30 bg-gold-300/5">
        <InfoIcon className="h-4 w-4 text-gold-300" />
        <AlertTitle>Current Staking Information</AlertTitle>
        <AlertDescription>
          As of May 15, 2025, the annual DIGR yield rate is 5.4% with rewards distributed across 146 epochs per year. A
          2% ecosystem fee is applied to all staking rewards.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-6 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rarity">Rarity Tiers</TabsTrigger>
          <TabsTrigger value="staking">Staking Rewards</TabsTrigger>
          <TabsTrigger value="missions">Mission Rewards</TabsTrigger>
          <TabsTrigger value="abilities">Special Abilities</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>The Gold Diggers Ecosystem</CardTitle>
              <CardDescription>
                A comprehensive guide to the Gold Diggers, Jailbirds, and Syndicate crews on Solana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p>
                  The Gold Diggers ecosystem on Solana features three distinct crews: Gold Diggers (GOLD), Jailbirds
                  (JAIL), and Syndicate (S|). Each NFT belongs to one of six rarity tiers, which determine its staking
                  power, mission capabilities, and reward potential.
                </p>

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
                        <p className="text-sm text-muted-foreground">{crew.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Key Ecosystem Features</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Rarity Tiers:</strong> Six tiers from Common to Mythic, each with a specific multiplier
                      that affects staking power
                    </li>
                    <li>
                      <strong>Staking Rewards:</strong> Earn passive DIGR by staking NFTs, with yields based on rarity
                    </li>
                    <li>
                      <strong>Missions:</strong> Deploy NFTs on missions to earn DIGR, rare NFT drops, and leaderboard
                      points
                    </li>
                    <li>
                      <strong>Special Abilities:</strong> Each NFT has unique abilities that enhance mission performance
                    </li>
                    <li>
                      <strong>Cross-Crew Synergy:</strong> Combine NFTs from different crews for strategic advantages
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rarity">
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

              <div className="mt-6 p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                <h3 className="text-lg font-medium mb-2">Rarity Effects</h3>
                <p className="mb-2">Rarity impacts several aspects of gameplay:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Staking power and DIGR yield</li>
                  <li>Mission success rates through skill and ability bonuses</li>
                  <li>Mission reward bonuses</li>
                  <li>Rare NFT drop chances</li>
                  <li>Leaderboard points</li>
                  <li>Economic and collector value</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staking">
          <Card>
            <CardHeader>
              <CardTitle>Staking Power and DIGR Yield</CardTitle>
              <CardDescription>How rarity affects staking power and the passive DIGR rewards you earn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Staking Power Formula</h3>
                  <div className="font-mono text-sm p-2 bg-black/5 rounded">
                    Total Staking Power = Base Staking Power (100) × Rarity Multiplier
                  </div>
                </div>

                <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">DIGR Yield Formula</h3>
                  <div className="space-y-2 font-mono text-sm p-2 bg-black/5 rounded">
                    <p>Annual DIGR Yield = Total Staking Power × 0.054</p>
                    <p>Per-Epoch DIGR Yield = Annual DIGR Yield ÷ 146 (epochs per year)</p>
                    <p>Final Per-Epoch DIGR Yield = Per-Epoch DIGR Yield × 0.98 (after 2% ecosystem fee)</p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rarity Example</TableHead>
                      <TableHead>Staking Power</TableHead>
                      <TableHead>Annual DIGR Yield</TableHead>
                      <TableHead>Per-Epoch DIGR</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Common (Gina Diggers)</div>
                        <Badge className="text-white" style={{ backgroundColor: rarityTiers[0].color }}>
                          1.0x
                        </Badge>
                      </TableCell>
                      <TableCell>100 GOLD</TableCell>
                      <TableCell>{calculateAnnualYield(100).toFixed(2)} DIGR</TableCell>
                      <TableCell>{calculateEpochYield(100).toFixed(4)} DIGR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Uncommon (Sunny Rodriguez)</div>
                        <Badge className="text-white" style={{ backgroundColor: rarityTiers[1].color }}>
                          1.5x
                        </Badge>
                      </TableCell>
                      <TableCell>150 S|</TableCell>
                      <TableCell>{calculateAnnualYield(150).toFixed(2)} DIGR</TableCell>
                      <TableCell>{calculateEpochYield(150).toFixed(4)} DIGR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Rare (Nico Falco)</div>
                        <Badge className="text-white" style={{ backgroundColor: rarityTiers[2].color }}>
                          2.0x
                        </Badge>
                      </TableCell>
                      <TableCell>200 S|</TableCell>
                      <TableCell>{calculateAnnualYield(200).toFixed(2)} DIGR</TableCell>
                      <TableCell>{calculateEpochYield(200).toFixed(4)} DIGR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Epic (Williams)</div>
                        <Badge className="text-white" style={{ backgroundColor: rarityTiers[3].color }}>
                          5.0x
                        </Badge>
                      </TableCell>
                      <TableCell>500 JAIL</TableCell>
                      <TableCell>{calculateAnnualYield(500).toFixed(2)} DIGR</TableCell>
                      <TableCell>{calculateEpochYield(500).toFixed(4)} DIGR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Legendary (Victor Moretti)</div>
                        <Badge className="text-white" style={{ backgroundColor: rarityTiers[4].color }}>
                          10.0x
                        </Badge>
                      </TableCell>
                      <TableCell>1000 S|</TableCell>
                      <TableCell>{calculateAnnualYield(1000).toFixed(2)} DIGR</TableCell>
                      <TableCell>{calculateEpochYield(1000).toFixed(4)} DIGR</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="font-medium">Mythic (Hypothetical)</div>
                        <Badge className="text-white" style={{ backgroundColor: rarityTiers[5].color }}>
                          20.0x
                        </Badge>
                      </TableCell>
                      <TableCell>2000 GOLD</TableCell>
                      <TableCell>{calculateAnnualYield(2000).toFixed(2)} DIGR</TableCell>
                      <TableCell>{calculateEpochYield(2000).toFixed(4)} DIGR</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-4 p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Key Insights</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Higher rarity NFTs yield significantly more DIGR, incentivizing users to collect rarer characters
                    </li>
                    <li>
                      A Mythic NFT yields 20x more DIGR per epoch than a Common NFT (
                      {calculateEpochYield(2000).toFixed(4)} vs {calculateEpochYield(100).toFixed(4)})
                    </li>
                    <li>Staking multiple NFTs combines their staking power, allowing strategic portfolio building</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="missions">
          <Card>
            <CardHeader>
              <CardTitle>Mission Rewards and Success Rates</CardTitle>
              <CardDescription>How rarity affects mission success, rewards, and rare NFT drop chances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Mission Staking Bonus</h3>
                    <div className="font-mono text-sm p-2 bg-black/5 rounded">
                      Staking Bonus (DIGR) = Total Staking Power × 0.05
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      This bonus is added to the base mission reward, providing additional DIGR based on the team's
                      staking power.
                    </p>
                  </div>

                  <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                    <h3 className="text-lg font-medium mb-2">Mission Success Rate</h3>
                    <div className="font-mono text-sm p-2 bg-black/5 rounded">
                      Success Rate = Base Success + Skill Boosts + Ability Boosts
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Higher-rarity NFTs typically have stronger skills and special abilities, improving mission success
                      rates.
                    </p>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mission Tier</TableHead>
                      <TableHead>Base Success</TableHead>
                      <TableHead>Base Reward</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>NFT Drop Chance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {missionTiers.map((tier) => (
                      <TableRow key={tier.name}>
                        <TableCell>
                          <div className="font-medium">{tier.name}</div>
                          <Badge className="text-white" style={{ backgroundColor: tier.color }}>
                            {tier.name}
                          </Badge>
                        </TableCell>
                        <TableCell>{tier.baseSuccess}%</TableCell>
                        <TableCell>{tier.baseReward} DIGR</TableCell>
                        <TableCell>{tier.points}</TableCell>
                        <TableCell>{tier.dropChance}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Example: Legendary Mission</h3>
                  <p className="mb-2">
                    "Infiltrate the Syndicate HQ" (Base Success: 20%, Base Reward: 500 DIGR, NFT Drop Chance: 5%)
                  </p>

                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-medium">Common Team (3x Gina Diggers)</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Success Rate: 20% (low chance of success)</li>
                        <li>Staking Power: 300 (100 × 3)</li>
                        <li>Staking Bonus: 15 DIGR (300 × 0.05)</li>
                        <li>Total Reward: 515 DIGR (if successful)</li>
                        <li>Effective Drop Chance: 1% (5% × 20% success)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Mixed Rarity Team (Legendary, Epic, Rare)</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Success Rate: 75% (good chance of success)</li>
                        <li>Staking Power: 1700 (1000 + 500 + 200)</li>
                        <li>Staking Bonus: 85 DIGR (1700 × 0.05)</li>
                        <li>Special Ability: "Double planning rewards" increases portion of reward</li>
                        <li>Total Reward: ~750 DIGR (if successful)</li>
                        <li>Effective Drop Chance: 3.75% (5% × 75% success)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Mythic Team (3x Hypothetical Mythic)</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Success Rate: 95% (near-guaranteed success)</li>
                        <li>Staking Power: 6000 (2000 × 3)</li>
                        <li>Staking Bonus: 300 DIGR (6000 × 0.05)</li>
                        <li>Special Ability: "Triple mission rewards" triples base reward</li>
                        <li>Total Reward: 1800 DIGR (if successful)</li>
                        <li>Effective Drop Chance: 4.75% (5% × 95% success)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abilities">
          <Card>
            <CardHeader>
              <CardTitle>Special Ability Interactions</CardTitle>
              <CardDescription>How special abilities from different crews interact during missions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialAbilityTypes.map((type) => (
                    <Card key={type.name} className="border-gold-300/10">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{type.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2">{type.description}</p>
                        <div className="text-xs text-muted-foreground">
                          <span className="font-medium">Examples: </span>
                          {type.examples.join(", ")}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Ability Interaction Rules</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Success Rate Interactions</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Abilities that increase success rates for the same mission type stack additively</li>
                        <li>If abilities target different mission types, only the relevant ones apply</li>
                        <li>Total success rate is capped at 95% to maintain challenge</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Reward Multiplier Interactions</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Reward multipliers stack multiplicatively if they apply to different mission components</li>
                        <li>
                          If two abilities multiply the same reward type, the higher multiplier applies (not both)
                        </li>
                        <li>Staking power bonuses are added after reward multipliers</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Cooldown Reduction Interactions</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>If multiple abilities reduce cooldowns, the largest reduction is used</li>
                        <li>Cooldown reductions don't stack (e.g., 50% + 30% doesn't equal 80%)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Team Buff Interactions</h4>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>Buffs like "30% reduced damage for team" apply to all NFTs in the mission</li>
                        <li>
                          If buffs target different mechanics (e.g., damage reduction vs. success boost), they apply
                          independently
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Strategic Considerations</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Maximize Synergy:</strong> Pair abilities that complement each other (e.g., reward
                      multipliers for different mission components)
                    </li>
                    <li>
                      <strong>Avoid Redundant Abilities:</strong> Don't stack reward multipliers for the same mission
                      type
                    </li>
                    <li>
                      <strong>Balance Success and Rewards:</strong> Use success-boosting abilities to ensure completion,
                      then add reward multipliers
                    </li>
                    <li>
                      <strong>Mitigate Downtime:</strong> Prioritize cooldown reduction abilities in high-risk missions
                    </li>
                    <li>
                      <strong>Leverage Team Buffs:</strong> Use team-wide buffs in missions with high failure risks
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketplace">
          <Card>
            <CardHeader>
              <CardTitle>NFT Marketplace Dynamics</CardTitle>
              <CardDescription>How rarity affects trading, value, and the broader Solana marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Trading Mechanisms</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Direct Trading:</strong> Users can list and purchase NFTs directly within the ecosystem's
                      marketplace with 0% commission
                    </li>
                    <li>
                      <strong>Mission-Driven Value:</strong> NFTs gain value based on their utility in cross-crew
                      missions
                    </li>
                    <li>
                      <strong>Rarity and Scarcity:</strong> Rarity tiers influence supply and demand, with Mythic NFTs
                      (0.5% mint probability) being extremely valuable
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">User Incentives</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Staking Rewards:</strong> Passive DIGR earnings incentivize holding higher-rarity NFTs
                    </li>
                    <li>
                      <strong>Mission Rewards:</strong> DIGR, rare NFT drops, and leaderboard points drive demand for
                      mission-capable NFTs
                    </li>
                    <li>
                      <strong>Leaderboard Incentives:</strong> Weekly leaderboards reward top users with bonus DIGR,
                      encouraging strategic NFT acquisition
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Economic Impacts</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Price Volatility:</strong> NFT prices fluctuate based on mission success rates, special
                      ability utility, and rarity
                    </li>
                    <li>
                      <strong>Liquidity and Trading Volume:</strong> The 0% commission model ensures high liquidity
                    </li>
                    <li>
                      <strong>Secondary Market Integration:</strong> NFTs can also be traded on broader Solana
                      marketplaces like Magic Eden or Tensor
                    </li>
                  </ul>
                </div>

                <div className="mt-4 p-4 bg-gold-300/5 border border-gold-300/10 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Broader Solana NFT Context (2025)</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Market Growth:</strong> Solana NFT sales surged 34% to $16 million in traded volume
                      recently
                    </li>
                    <li>
                      <strong>Dominant Marketplaces:</strong> Magic Eden (90% of transactions) and Tensor lead the
                      Solana NFT space
                    </li>
                    <li>
                      <strong>User Trends:</strong> 33% spike in weekly NFT sales to $302M, with new buyers increasing
                      92% week-over-week
                    </li>
                    <li>
                      <strong>Active Ecosystem:</strong> 4.2M active weekly wallets (32% growth in 90 days) on Solana
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
