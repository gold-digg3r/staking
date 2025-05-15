"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Coins, Clock, BarChart3 } from "lucide-react"

// Mock data for analytics
const tvlData = [
  { date: "Jan", tvl: 25000 },
  { date: "Feb", tvl: 35000 },
  { date: "Mar", tvl: 42000 },
  { date: "Apr", tvl: 38000 },
  { date: "May", tvl: 52000 },
  { date: "Jun", tvl: 65000 },
  { date: "Jul", tvl: 78000 },
]

const rewardsData = [
  { date: "Jan", rewards: 1200 },
  { date: "Feb", rewards: 1800 },
  { date: "Mar", rewards: 2200 },
  { date: "Apr", rewards: 1900 },
  { date: "May", rewards: 2500 },
  { date: "Jun", rewards: 3100 },
  { date: "Jul", rewards: 3800 },
]

const stakersData = [
  { date: "Jan", stakers: 120 },
  { date: "Feb", stakers: 180 },
  { date: "Mar", stakers: 220 },
  { date: "Apr", stakers: 250 },
  { date: "May", stakers: 310 },
  { date: "Jun", stakers: 380 },
  { date: "Jul", stakers: 450 },
]

const poolDistributionData = [
  { name: "Gold Diggers", value: 45 },
  { name: "Jailbirds", value: 30 },
  { name: "Syndicate", value: 15 },
  { name: "DIGR Token", value: 10 },
]

export function StakingAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("month")

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staking Analytics</h2>
          <p className="text-muted-foreground">Track staking metrics and performance across the platform</p>
        </div>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full md:w-auto mt-4 md:mt-0">
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Value Locked"
          value="$78,450"
          change="+12.5%"
          trend="up"
          icon={<TrendingUp className="h-5 w-5 text-gold-500" />}
        />
        <MetricCard
          title="Active Stakers"
          value="450"
          change="+18.4%"
          trend="up"
          icon={<Users className="h-5 w-5 text-gold-500" />}
        />
        <MetricCard
          title="Total Rewards"
          value="15,750 DIGR"
          change="+22.6%"
          trend="up"
          icon={<Coins className="h-5 w-5 text-gold-500" />}
        />
        <MetricCard
          title="Avg. Staking Period"
          value="45 days"
          change="+5.2%"
          trend="up"
          icon={<Clock className="h-5 w-5 text-gold-500" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-gold-500/10">
          <CardHeader className="bg-gradient-to-r from-gold-900/20 to-gold-800/10 border-b border-gold-500/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-gold-500" />
                Total Value Locked
              </CardTitle>
              <Badge variant="outline" className="border-gold-500/30 text-gold-500">
                {timeframe === "week"
                  ? "Last 7 days"
                  : timeframe === "month"
                    ? "Last 30 days"
                    : timeframe === "year"
                      ? "Last 12 months"
                      : "All time"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                tvl: {
                  label: "TVL",
                  color: "hsl(var(--gold-500))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tvlData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="tvlGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--gold-500))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--gold-500))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="tvl"
                    stroke="hsl(var(--gold-500))"
                    fillOpacity={1}
                    fill="url(#tvlGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-gold-500/10">
          <CardHeader className="bg-gradient-to-r from-gold-900/20 to-gold-800/10 border-b border-gold-500/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Coins className="mr-2 h-5 w-5 text-gold-500" />
                Rewards Distributed
              </CardTitle>
              <Badge variant="outline" className="border-gold-500/30 text-gold-500">
                {timeframe === "week"
                  ? "Last 7 days"
                  : timeframe === "month"
                    ? "Last 30 days"
                    : timeframe === "year"
                      ? "Last 12 months"
                      : "All time"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                rewards: {
                  label: "Rewards",
                  color: "hsl(var(--gold-500))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rewardsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="rewards"
                    stroke="hsl(var(--gold-500))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-gold-500/10">
          <CardHeader className="bg-gradient-to-r from-gold-900/20 to-gold-800/10 border-b border-gold-500/10">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl flex items-center">
                <Users className="mr-2 h-5 w-5 text-gold-500" />
                Active Stakers
              </CardTitle>
              <Badge variant="outline" className="border-gold-500/30 text-gold-500">
                {timeframe === "week"
                  ? "Last 7 days"
                  : timeframe === "month"
                    ? "Last 30 days"
                    : timeframe === "year"
                      ? "Last 12 months"
                      : "All time"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartContainer
              config={{
                stakers: {
                  label: "Stakers",
                  color: "hsl(var(--gold-500))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stakersData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="stakers" fill="hsl(var(--gold-500))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="border-gold-500/10">
          <CardHeader className="bg-gradient-to-r from-gold-900/20 to-gold-800/10 border-b border-gold-500/10">
            <CardTitle className="text-xl flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-gold-500" />
              Pool Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {poolDistributionData.map((pool) => (
                <div key={pool.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{pool.name}</span>
                    <span className="font-medium">{pool.value}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-gold-500 h-2.5 rounded-full" style={{ width: `${pool.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
}

function MetricCard({ title, value, change, trend, icon }: MetricCardProps) {
  return (
    <Card className="border-gold-500/10">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className={`text-xs mt-1 ${trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {change} from last period
            </p>
          </div>
          <div className="p-2 rounded-full bg-gold-500/10">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
