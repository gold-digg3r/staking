"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function stakeTokens(
  userId: string,
  poolId: string,
  amount: number,
  duration: number,
  autoCompound: boolean,
) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("staking_positions")
    .insert([
      {
        user_id: userId,
        pool_id: poolId,
        amount,
        duration,
        auto_compound: autoCompound,
        status: "active",
        end_date: new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error staking tokens:", error)
    return { error: error.message }
  }

  // Update user's total staked amount
  await updateUserTotalStaked(userId)

  revalidatePath("/staking")
  return { data }
}

export async function unstakeTokens(userId: string, positionId: string) {
  const supabase = createClient()

  // First check if position exists and belongs to user
  const { data: position, error: checkError } = await supabase
    .from("staking_positions")
    .select("*")
    .eq("id", positionId)
    .eq("user_id", userId)
    .single()

  if (checkError || !position) {
    console.error("Error checking staking position:", checkError)
    return { error: "Staking position not found or not owned by user" }
  }

  // Check if position is eligible for unstaking
  const now = new Date()
  const endDate = new Date(position.end_date)

  if (now < endDate && !position.allow_early_unstake) {
    return { error: "This position is not eligible for early unstaking" }
  }

  // Update position status
  const { data, error } = await supabase
    .from("staking_positions")
    .update({ status: "unstaked", unstaked_at: now.toISOString() })
    .eq("id", positionId)
    .eq("user_id", userId) // Security check
    .select()
    .single()

  if (error) {
    console.error("Error unstaking tokens:", error)
    return { error: error.message }
  }

  // Update user's total staked amount
  await updateUserTotalStaked(userId)

  revalidatePath("/staking")
  return { data }
}

export async function claimRewards(userId: string, positionId: string) {
  const supabase = createClient()

  // First check if position exists and belongs to user
  const { data: position, error: checkError } = await supabase
    .from("staking_positions")
    .select("*")
    .eq("id", positionId)
    .eq("user_id", userId)
    .single()

  if (checkError || !position) {
    console.error("Error checking staking position:", checkError)
    return { error: "Staking position not found or not owned by user" }
  }

  // Calculate rewards (this would be more complex in a real app)
  const daysStaked = Math.floor((Date.now() - new Date(position.created_at).getTime()) / (24 * 60 * 60 * 1000))
  const estimatedRewards = position.amount * (position.apr / 100) * (daysStaked / 365)

  // Record the reward claim
  const { data, error } = await supabase
    .from("staking_rewards")
    .insert([
      {
        user_id: userId,
        position_id: positionId,
        amount: estimatedRewards,
        status: "claimed",
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error claiming rewards:", error)
    return { error: error.message }
  }

  // Reset the last_claimed_at date on the position
  await supabase.from("staking_positions").update({ last_claimed_at: new Date().toISOString() }).eq("id", positionId)

  revalidatePath("/staking")
  return { data, amount: estimatedRewards }
}

async function updateUserTotalStaked(userId: string) {
  const supabase = createClient()

  // Get sum of all active staking positions
  const { data, error } = await supabase
    .from("staking_positions")
    .select("amount")
    .eq("user_id", userId)
    .eq("status", "active")

  if (error) {
    console.error("Error calculating total staked:", error)
    return
  }

  const totalStaked = data.reduce((sum, position) => sum + position.amount, 0)

  // Update user profile
  await supabase.from("profiles").update({ total_staked: totalStaked }).eq("id", userId)
}
