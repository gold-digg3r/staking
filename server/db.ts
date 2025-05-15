"use server"

import { createClient } from "@/utils/supabase/server"

export async function getStakingPools() {
  const supabase = createClient()

  const { data, error } = await supabase.from("staking_pools").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching staking pools:", error)
    return []
  }

  return data
}

export async function getStakingPositions(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("staking_positions")
    .select("*, staking_pools(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching staking positions:", error)
    return []
  }

  return data
}

export async function getStakingRewards(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("staking_rewards")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching staking rewards:", error)
    return []
  }

  return data
}
