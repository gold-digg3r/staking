"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { formatNumber } from "@/lib/utils/format"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Mock data for the chart
const generateChartData = (timeframe: string) => {
  const data = []
  let days = 7

  switch (timeframe) {
    case "week":
      days = 7
      break
    case "month":
      days = 30
      break
    case "year":
      days = 365
      break
    case "all":
      days = 730
      break
  }

  // Generate random data points
  const baseValue = 100
  let currentValue = baseValue

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))

    // Add some randomness to the value
    const change = Math.random() * 10 - 5
    currentValue = Math.max(0, currentValue + change)

    data.push({
      date: date.toISOString().split("T")[0],
      rewards: currentValue,
      apr: (8 + Math.random() * 5).toFixed(2),
    })
  }

  return data
}

export function StakingRewardsChart() {
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("week")
  const { toast } = useToast()

  // Use memo to cache chart data and prevent unnecessary recalculations
  const chartData = useMemo(() => generateChartData(timeframe), [timeframe])

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // In a real implementation, this would fetch chart data from your API
        // For now, we'll just simulate loading
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Error fetching chart data:", error)
        toast({
          title: "Error",
          description: "Failed to load rewards data. Please try again.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchChartData()
  }, [timeframe, toast])

  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem)

    // Different formats based on timeframe
    if (timeframe === "week") {
      return date.toLocaleDateString(undefined, { weekday: "short" })
    } else if (timeframe === "month") {
      return date.toLocaleDateString(undefined, { day: "numeric", month: "short" })
    } else {
      return date.toLocaleDateString(undefined, { month: "short", year: "2-digit" })
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-gold-300/20 p-3 rounded-md shadow-md">
          <p className="text-sm font-medium">
            {new Date(label).toLocaleDateString(undefined, { dateStyle: "medium" })}
          </p>
          <p className="text-sm text-gold-300">
            Rewards: <span className="font-semibold">{formatNumber(payload[0].value)} DIGR</span>
          </p>
          <p className="text-sm text-blue-400">
            APR: <span className="font-semibold">{payload[1].value}%</span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="week" value={timeframe} onValueChange={setTimeframe} className="w-full">
        <div className="flex justify-end mb-4">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="week" className="h-[300px]">
          {renderChart()}
        </TabsContent>

        <TabsContent value="month" className="h-[300px]">
          {renderChart()}
        </TabsContent>

        <TabsContent value="year" className="h-[300px]">
          {renderChart()}
        </TabsContent>

        <TabsContent value="all" className="h-[300px]">
          {renderChart()}
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Total Rewards</div>
            <div className="text-2xl font-bold mt-1">1,245.32 DIGR</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Current APY</div>
            <div className="text-2xl font-bold mt-1">12.5%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Staked NFTs</div>
            <div className="text-2xl font-bold mt-1">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted-foreground">Staked Since</div>
            <div className="text-2xl font-bold mt-1">14 days</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  function renderChart() {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="date" tickFormatter={formatXAxis} stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="rgba(255,255,255,0.5)"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="rewards"
            name="DIGR Rewards"
            stroke="#D4AF37"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="apr"
            name="APR %"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

export default StakingRewardsChart
