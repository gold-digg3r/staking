"use server"

import { createClient } from "@/utils/supabase/server"

export async function getUserRewards(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("staking_rewards")
    .select("*, staking_positions(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user rewards:", error)
    return []
  }

  return data
}

export async function getRewardsSummary(userId: string) {
  const supabase = createClient()

  // Get total rewards claimed
  const { data: claimedData, error: claimedError } = await supabase
    .from("staking_rewards")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "claimed")

  if (claimedError) {
    console.error("Error fetching claimed rewards:", claimedError)
    return null
  }

  const totalClaimed = claimedData.reduce((sum, reward) => sum + reward.amount, 0)

  // Get pending rewards (this would be more complex in a real app)
  const { data: positionsData, error: positionsError } = await supabase
    .from("staking_positions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")

  if (positionsError) {
    console.error("Error fetching staking positions:", positionsError)
    return null
  }

  // Calculate pending rewards (simplified)
  let pendingRewards = 0
  for (const position of positionsData) {
    const lastClaimed = position.last_claimed_at ? new Date(position.last_claimed_at) : new Date(position.created_at)
    const now = new Date()
    const daysSinceLastClaim = Math.max(0, (now.getTime() - lastClaimed.getTime()) / (24 * 60 * 60 * 1000))

    pendingRewards += position.amount * (position.apr / 100) * (daysSinceLastClaim / 365)
  }

  return {
    totalClaimed,
    pendingRewards,
    totalRewards: totalClaimed + pendingRewards,
  }
}
