"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { TokenIcon } from "@/components/ui/token-icon"
import { Calculator, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RewardsCalculator() {
  const [amount, setAmount] = useState<string>("1")
  const [duration, setDuration] = useState<number>(30) // days
  const [nftType, setNftType] = useState<string>("gold-digger")
  const [nftRarity, setNftRarity] = useState<string>("common")
  const [calculatedRewards, setCalculatedRewards] = useState<number>(0)
  const [apr, setApr] = useState<number>(0)
  const [calculationType, setCalculationType] = useState<"nft" | "token">("nft")

  // NFT rarity multipliers
  const rarityMultipliers = {
    common: 1,
    uncommon: 1.5,
    rare: 2,
    epic: 3,
    legendary: 5,
    mythic: 10,
  }

  // Base APR rates
  const baseAprRates = {
    "gold-digger": 12,
    jailbirds: 10,
    syndicate: 15,
    digr: 18,
    gold: 10,
  }

  // Duration multipliers
  const durationMultipliers = {
    30: 1,
    60: 1.2,
    90: 1.5,
  }

  useEffect(() => {
    calculateRewards()
  }, [amount, duration, nftType, nftRarity, calculationType])

  const calculateRewards = () => {
    const baseApr = baseAprRates[nftType as keyof typeof baseAprRates] || 10
    const durationMultiplier = durationMultipliers[duration as keyof typeof durationMultipliers] || 1

    let calculatedApr = baseApr * durationMultiplier

    if (calculationType === "nft") {
      const rarityMultiplier = rarityMultipliers[nftRarity as keyof typeof rarityMultipliers] || 1
      calculatedApr *= rarityMultiplier
    }

    setApr(calculatedApr)

    const amountNum = Number.parseFloat(amount) || 0
    const daysInYear = 365
    const rewards = ((amountNum * calculatedApr) / 100) * (duration / daysInYear)

    setCalculatedRewards(rewards)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-gold-500" />
              Rewards Calculator
            </CardTitle>
            <CardDescription>Estimate your potential staking rewards</CardDescription>
          </div>
          <div className="flex border rounded-lg overflow-hidden">
            <Button
              variant={calculationType === "nft" ? "default" : "ghost"}
              className={calculationType === "nft" ? "bg-gold-600 hover:bg-gold-700 text-black" : ""}
              onClick={() => setCalculationType("nft")}
              size="sm"
            >
              NFT
            </Button>
            <Button
              variant={calculationType === "token" ? "default" : "ghost"}
              className={calculationType === "token" ? "bg-gold-600 hover:bg-gold-700 text-black" : ""}
              onClick={() => setCalculationType("token")}
              size="sm"
            >
              Token
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {calculationType === "nft" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="nft-type">NFT Collection</Label>
                <Select value={nftType} onValueChange={setNftType}>
                  <SelectTrigger id="nft-type">
                    <SelectValue placeholder="Select NFT collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gold-digger">Gold Digger</SelectItem>
                    <SelectItem value="jailbirds">Jailbirds</SelectItem>
                    <SelectItem value="syndicate">Syndicate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nft-rarity">NFT Rarity</Label>
                <Select value={nftRarity} onValueChange={setNftRarity}>
                  <SelectTrigger id="nft-rarity">
                    <SelectValue placeholder="Select NFT rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="uncommon">Uncommon</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                    <SelectItem value="mythic">Mythic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nft-amount">Number of NFTs</Label>
                <Input
                  id="nft-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="1"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="token-type">Token</Label>
                <Select value={nftType} onValueChange={setNftType}>
                  <SelectTrigger id="token-type">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digr">
                      <div className="flex items-center">
                        <TokenIcon symbol="DIGR" size="sm" className="mr-2" />
                        DIGR
                      </div>
                    </SelectItem>
                    <SelectItem value="gold">
                      <div className="flex items-center">
                        <TokenIcon symbol="GOLD" size="sm" className="mr-2" />
                        GOLD
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-amount">Amount</Label>
                <Input
                  id="token-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="duration">Staking Duration</Label>
              <span className="text-sm font-medium">{duration} days</span>
            </div>
            <Slider
              id="duration"
              min={30}
              max={90}
              step={30}
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30 days</span>
              <span>60 days</span>
              <span>90 days</span>
            </div>
          </div>

          <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="text-sm font-medium">Effective APR</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        APR is calculated based on collection type, rarity, and staking duration. Higher rarity NFTs and
                        longer staking periods yield higher rewards.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-bold text-gold-500">{apr.toFixed(2)}%</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Estimated Rewards</span>
              <div className="flex items-center">
                <span className="font-bold text-xl text-gold-500">{calculatedRewards.toFixed(2)}</span>
                <TokenIcon symbol="DIGR" size="sm" className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
