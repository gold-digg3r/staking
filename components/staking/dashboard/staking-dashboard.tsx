"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StakingPoolsList } from "@/components/staking/pools/staking-pools-list"
import { StakedNftsList } from "@/components/staking/staked-nfts-list"
import { StakingRewardsChart } from "@/components/staking/staking-rewards-chart"
import { StakingHistory } from "@/components/staking/staking-history"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StakingDashboard() {
  const [activeTab, setActiveTab] = useState("pools")
  const [isExpanded, setIsExpanded] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  return (
    <div className="space-y-8 mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Staking Dashboard</h2>
          <p className="text-muted-foreground">Stake your NFTs and tokens to earn rewards</p>
        </div>

        {isMobile ? (
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full md:w-auto flex items-center justify-between"
          >
            {activeTab === "pools"
              ? "Staking Pools"
              : activeTab === "my-stakes"
                ? "My Stakes"
                : activeTab === "rewards"
                  ? "Rewards"
                  : "History"}
            <ChevronDown
              className={cn("ml-2 h-4 w-4 transition-transform", isExpanded ? "transform rotate-180" : "")}
            />
          </Button>
        ) : null}
      </div>

      <Tabs defaultValue="pools" value={activeTab} onValueChange={handleTabChange} className="w-full">
        {(!isMobile || isExpanded) && (
          <TabsList
            className={cn(
              "w-full md:w-auto grid grid-cols-4",
              isMobile ? "absolute z-10 bg-background border rounded-md shadow-lg" : "",
            )}
          >
            <TabsTrigger value="pools" onClick={() => isMobile && setIsExpanded(false)}>
              Pools
            </TabsTrigger>
            <TabsTrigger value="my-stakes" onClick={() => isMobile && setIsExpanded(false)}>
              My Stakes
            </TabsTrigger>
            <TabsTrigger value="rewards" onClick={() => isMobile && setIsExpanded(false)}>
              Rewards
            </TabsTrigger>
            <TabsTrigger value="history" onClick={() => isMobile && setIsExpanded(false)}>
              History
            </TabsTrigger>
          </TabsList>
        )}

        <div className="mt-6">
          <TabsContent value="pools" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Staking Pools</CardTitle>
                <CardDescription>Choose a pool to stake your NFTs and earn rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <StakingPoolsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-stakes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Staked NFTs</CardTitle>
                <CardDescription>View and manage your staked NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <StakedNftsList />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staking Rewards</CardTitle>
                <CardDescription>Track your staking rewards over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <StakingRewardsChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Staking History</CardTitle>
                <CardDescription>View your staking and unstaking history</CardDescription>
              </CardHeader>
              <CardContent>
                <StakingHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
