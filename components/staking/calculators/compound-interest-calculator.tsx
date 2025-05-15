"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TokenIcon } from "@/components/ui/token-icon"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

type TokenType = "DIGR" | "GOLD"
type CompoundFrequency = "daily" | "weekly" | "monthly"

interface CompoundInterestCalculatorProps {
  defaultToken?: TokenType
  defaultAmount?: number
  defaultDuration?: number
  className?: string
}

export function CompoundInterestCalculator({
  defaultToken = "DIGR",
  defaultAmount = 1000,
  defaultDuration = 90,
  className,
}: CompoundInterestCalculatorProps) {
  const [token, setToken] = useState<TokenType>(defaultToken)
  const [amount, setAmount] = useState<number>(defaultAmount)
  const [duration, setDuration] = useState<number>(defaultDuration)
  const [frequency, setFrequency] = useState<CompoundFrequency>("weekly")
  const [chartData, setChartData] = useState<any[]>([])
  const [comparison, setComparison] = useState<{
    standard: number
    compound: number
    difference: number
    percentageIncrease: number
  }>({
    standard: 0,
    compound: 0,
    difference: 0,
    percentageIncrease: 0,
  })

  // APR rates based on token and duration
  const getAPR = (token: TokenType, days: number): number => {
    if (token === "DIGR") {
      if (days <= 30) return 12
      if (days <= 60) return 15
      return 18
    } else {
      // GOLD token
      if (days <= 30) return 10
      if (days <= 60) return 12
      return 15
    }
  }

  // Number of compounds based on frequency and duration
  const getCompoundCount = (frequency: CompoundFrequency, days: number): number => {
    switch (frequency) {
      case "daily":
        return days
      case "weekly":
        return Math.floor(days / 7)
      case "monthly":
        return Math.floor(days / 30)
      default:
        return Math.floor(days / 7)
    }
  }

  // Calculate standard interest
  const calculateStandardInterest = (principal: number, apr: number, days: number): number => {
    const yearFraction = days / 365
    return principal * (1 + (apr / 100) * yearFraction)
  }

  // Calculate compound interest
  const calculateCompoundInterest = (
    principal: number,
    apr: number,
    days: number,
    compoundFrequency: CompoundFrequency,
  ): number => {
    const yearFraction = days / 365
    const compoundCount = getCompoundCount(compoundFrequency, days)

    if (compoundCount === 0) return calculateStandardInterest(principal, apr, days)

    const compoundInterval = days / compoundCount
    const compoundRate = (apr / 100) * (compoundInterval / 365)

    return principal * Math.pow(1 + compoundRate, compoundCount)
  }

  // Generate chart data
  const generateChartData = () => {
    const apr = getAPR(token, duration)
    const data = []

    // Generate data points for the chart (one point per week)
    const weeks = Math.ceil(duration / 7)

    for (let week = 0; week <= weeks; week++) {
      const days = week * 7
      if (days > duration) break

      const standardValue = calculateStandardInterest(amount, apr, days)
      const compoundValue = calculateCompoundInterest(amount, apr, days, frequency)

      data.push({
        week: week,
        days: days,
        standard: Number.parseFloat(standardValue.toFixed(2)),
        compound: Number.parseFloat(compoundValue.toFixed(2)),
      })
    }

    // Add the final day if not already included
    if (duration % 7 !== 0) {
      const standardValue = calculateStandardInterest(amount, apr, duration)
      const compoundValue = calculateCompoundInterest(amount, apr, duration, frequency)

      data.push({
        week: "Final",
        days: duration,
        standard: Number.parseFloat(standardValue.toFixed(2)),
        compound: Number.parseFloat(compoundValue.toFixed(2)),
      })
    }

    return data
  }

  // Update calculations when inputs change
  useEffect(() => {
    const apr = getAPR(token, duration)
    const standardFinal = calculateStandardInterest(amount, apr, duration)
    const compoundFinal = calculateCompoundInterest(amount, apr, duration, frequency)
    const difference = compoundFinal - standardFinal
    const percentageIncrease = (difference / standardFinal) * 100

    setComparison({
      standard: Number.parseFloat(standardFinal.toFixed(2)),
      compound: Number.parseFloat(compoundFinal.toFixed(2)),
      difference: Number.parseFloat(difference.toFixed(2)),
      percentageIncrease: Number.parseFloat(percentageIncrease.toFixed(2)),
    })

    setChartData(generateChartData())
  }, [token, amount, duration, frequency])

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Compound Interest Calculator</span>
        </CardTitle>
        <CardDescription>Compare standard interest vs compound interest for your token staking</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="token">Token</Label>
              <Select value={token} onValueChange={(value) => setToken(value as TokenType)}>
                <SelectTrigger id="token" className="w-full">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DIGR">
                    <div className="flex items-center gap-2">
                      <TokenIcon symbol="DIGR" size="sm" />
                      <span>DIGR</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="GOLD">
                    <div className="flex items-center gap-2">
                      <TokenIcon symbol="GOLD" size="sm" />
                      <span>GOLD</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="pr-16"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm text-muted-foreground">{token}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label htmlFor="duration">Duration: {duration} days</Label>
              <span className="text-sm text-muted-foreground">APR: {getAPR(token, duration)}%</span>
            </div>
            <Slider
              id="duration"
              min={7}
              max={365}
              step={1}
              value={[duration]}
              onValueChange={(values) => setDuration(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>7 days</span>
              <span>30 days</span>
              <span>90 days</span>
              <span>180 days</span>
              <span>365 days</span>
            </div>
          </div>

          <div>
            <Label htmlFor="frequency" className="mb-2 block">
              Compounding Frequency
            </Label>
            <Select value={frequency} onValueChange={(value) => setFrequency(value as CompoundFrequency)}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly (Default)</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Standard Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(comparison.standard)} {token}
                </div>
                <p className="text-sm text-muted-foreground">Simple interest at {getAPR(token, duration)}% APR</p>
              </CardContent>
            </Card>
            <Card className="bg-gold-500/5 border-gold-500/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <span>Compound Interest</span>
                  <span className="text-xs bg-gold-500/20 text-gold-500 px-2 py-0.5 rounded-full">
                    +{comparison.percentageIncrease}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-500">
                  {formatCurrency(comparison.compound)} {token}
                </div>
                <p className="text-sm text-muted-foreground">
                  {frequency.charAt(0).toUpperCase() + frequency.slice(1)} compounding
                  <span className="ml-1 text-gold-500">
                    +{formatCurrency(comparison.difference)} {token}
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Growth Comparison</h3>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  standard: {
                    label: "Standard Interest",
                    color: "hsl(var(--chart-1))",
                  },
                  compound: {
                    label: "Compound Interest",
                    color: "hsl(var(--gold-500))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="days" label={{ value: "Days", position: "insideBottom", offset: -5 }} />
                    <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="standard"
                      name="Standard Interest"
                      stroke="var(--color-standard)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="compound"
                      name="Compound Interest"
                      stroke="var(--color-compound)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4 mt-2">
            <h4 className="font-medium mb-2">How Compound Interest Works</h4>
            <p className="text-sm text-muted-foreground mb-2">
              With standard interest, you earn rewards only on your initial stake. With compound interest, your rewards
              are automatically reinvested, so you earn interest on both your initial stake and your accumulated
              rewards.
            </p>
            <div className="text-sm">
              <span className="font-medium">Example:</span> Staking {formatCurrency(amount)} {token} for {duration} days
              at {getAPR(token, duration)}% APR with {frequency} compounding earns you an extra{" "}
              {formatCurrency(comparison.difference)} {token} ({comparison.percentageIncrease}% more) compared to
              standard interest.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
