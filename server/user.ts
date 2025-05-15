"use server"

import { createClient } from "@/utils/supabase/server"

export async function getUserProfile(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function updateUserProfile(userId: string, updates: any) {
  const supabase = createClient()

  const { data, error } = await supabase.from("profiles").update(updates).eq("id", userId).select().single()

  if (error) {
    console.error("Error updating user profile:", error)
    return { error: error.message }
  }

  return { data }
}

export async function getUserLeaderboardPosition(userId: string) {
  const supabase = createClient()

  // First get the user's total staked amount
  const { data: userData, error: userError } = await supabase
    .from("profiles")
    .select("total_staked")
    .eq("id", userId)
    .single()

  if (userError || !userData) {
    console.error("Error fetching user data:", userError)
    return null
  }

  // Then count how many users have more staked than this user
  const { count, error: countError } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gt("total_staked", userData.total_staked)

  if (countError) {
    console.error("Error counting leaderboard position:", countError)
    return null
  }

  // Position is count + 1 (since we're counting users with MORE staked)
  return {
    position: (count || 0) + 1,
    totalStaked: userData.total_staked,
  }
}
