"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

type CompoundFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "semi-annually" | "annually" | "continuous"

interface APRtoAPYCalculatorProps {
  defaultAPR?: number
  className?: string
}

export function APRtoAPYCalculator({ defaultAPR = 15, className }: APRtoAPYCalculatorProps) {
  const [apr, setAPR] = useState<number>(defaultAPR)
  const [activeTab, setActiveTab] = useState<"calculator" | "comparison">("calculator")
  const [comparisonData, setComparisonData] = useState<any[]>([])

  // Calculate APY based on APR and compounding frequency
  const calculateAPY = (apr: number, frequency: CompoundFrequency): number => {
    const rate = apr / 100

    switch (frequency) {
      case "daily":
        return Math.pow(1 + rate / 365, 365) - 1
      case "weekly":
        return Math.pow(1 + rate / 52, 52) - 1
      case "monthly":
        return Math.pow(1 + rate / 12, 12) - 1
      case "quarterly":
        return Math.pow(1 + rate / 4, 4) - 1
      case "semi-annually":
        return Math.pow(1 + rate / 2, 2) - 1
      case "annually":
        return rate // APY = APR when compounded annually
      case "continuous":
        return Math.exp(rate) - 1
      default:
        return 0
    }
  }

  // Get compounding periods per year
  const getCompoundingPeriods = (frequency: CompoundFrequency): number => {
    switch (frequency) {
      case "daily":
        return 365
      case "weekly":
        return 52
      case "monthly":
        return 12
      case "quarterly":
        return 4
      case "semi-annually":
        return 2
      case "annually":
        return 1
      case "continuous":
        return Number.POSITIVE_INFINITY
      default:
        return 0
    }
  }

  // Generate comparison data for all frequencies
  const generateComparisonData = (aprValue: number) => {
    const frequencies: CompoundFrequency[] = [
      "annually",
      "semi-annually",
      "quarterly",
      "monthly",
      "weekly",
      "daily",
      "continuous",
    ]

    return frequencies.map((frequency) => {
      const apy = calculateAPY(aprValue, frequency)
      return {
        frequency,
        apy: Number((apy * 100).toFixed(2)),
        periods: getCompoundingPeriods(frequency),
        displayName: frequency.charAt(0).toUpperCase() + frequency.slice(1),
      }
    })
  }

  // Update comparison data when APR changes
  useEffect(() => {
    setComparisonData(generateComparisonData(apr))
  }, [apr])

  // Format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>APR to APY Calculator</span>
        </CardTitle>
        <CardDescription>
          Convert Annual Percentage Rate (APR) to Annual Percentage Yield (APY) based on compounding frequency
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "calculator" | "comparison")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="comparison">Frequency Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div>
              <Label htmlFor="apr" className="mb-2 block">
                Annual Percentage Rate (APR)
              </Label>
              <div className="relative">
                <Input
                  id="apr"
                  type="number"
                  min={0.1}
                  max={1000}
                  step={0.1}
                  value={apr}
                  onChange={(e) => setAPR(Number(e.target.value))}
                  className="pr-8"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {comparisonData.map((item) => (
                <Card
                  key={item.frequency}
                  className={item.frequency === "continuous" ? "bg-gold-500/5 border-gold-500/20" : "bg-muted/50"}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.displayName}</CardTitle>
                    <CardDescription>
                      {item.periods === Number.POSITIVE_INFINITY ? "∞" : item.periods} periods per year
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${item.frequency === "continuous" ? "text-gold-500" : ""}`}>
                      {formatPercentage(item.apy)}
                    </div>
                    <p className="text-sm text-muted-foreground">Effective Annual Yield</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <h4 className="font-medium mb-2">APR vs APY: What's the Difference?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>APR (Annual Percentage Rate)</strong> is the simple interest rate for a year without accounting
                for compounding.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                <strong>APY (Annual Percentage Yield)</strong> is the effective annual rate of return that accounts for
                compounding interest.
              </p>
              <p className="text-sm text-muted-foreground">
                The more frequently compounding occurs, the greater the difference between APR and APY. This is why
                staking platforms often advertise APY rather than APR.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="space-y-6">
              <div>
                <Label htmlFor="apr-comparison" className="mb-2 block">
                  Annual Percentage Rate (APR)
                </Label>
                <div className="relative">
                  <Input
                    id="apr-comparison"
                    type="number"
                    min={0.1}
                    max={1000}
                    step={0.1}
                    value={apr}
                    onChange={(e) => setAPR(Number(e.target.value))}
                    className="pr-8"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <div className="h-[350px] w-full">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="displayName" angle={-45} textAnchor="end" height={70} tick={{ fontSize: 12 }} />
                      <YAxis label={{ value: "APY (%)", angle: -90, position: "insideLeft" }} />
                      <ChartTooltip
                        formatter={(value: number) => [`${value}%`, "APY"]}
                        labelFormatter={(label) => `Compounding: ${label}`}
                      />
                      <Legend />
                      <Bar
                        dataKey="apy"
                        name="Annual Percentage Yield (APY)"
                        fill="var(--gold-500)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 mt-2">
                <h4 className="font-medium mb-2">The Impact of Compounding Frequency</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  As shown in the chart above, increasing the compounding frequency leads to a higher effective annual
                  yield (APY).
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  The most significant jumps occur when moving from annual to more frequent compounding. The difference
                  between daily and continuous compounding is minimal.
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Example:</strong> With an APR of {apr}%, the APY ranges from{" "}
                  {formatPercentage(comparisonData[0]?.apy || 0)} (annual compounding) to{" "}
                  {formatPercentage(comparisonData[6]?.apy || 0)} (continuous compounding).
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
