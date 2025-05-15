"use server"

import { createClient } from "@/utils/supabase/server"

export async function getStakingRewardsChartData(userId: string, days = 30) {
  const supabase = createClient()

  // Calculate the date range
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from("staking_rewards")
    .select("amount, created_at")
    .eq("user_id", userId)
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching chart data:", error)
    return []
  }

  // Group by day and aggregate
  const dailyData = data.reduce((acc: Record<string, number>, item) => {
    const date = new Date(item.created_at).toISOString().split("T")[0]
    acc[date] = (acc[date] || 0) + Number(item.amount)
    return acc
  }, {})

  // Convert to array format for charts
  return Object.entries(dailyData).map(([date, amount]) => ({
    date,
    amount,
  }))
}

export async function getStakingAPRHistory(poolId: string, days = 90) {
  const supabase = createClient()

  // Calculate the date range
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from("staking_apr_history")
    .select("apr, date")
    .eq("pool_id", poolId)
    .gte("date", startDate.toISOString())
    .lte("date", endDate.toISOString())
    .order("date", { ascending: true })

  if (error) {
    console.error("Error fetching APR history:", error)
    return []
  }

  return data
}
