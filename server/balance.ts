"use server"

import { createClient } from "@/utils/supabase/server"

export async function getUserTokenBalances(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("token_balances").select("*, tokens(*)").eq("user_id", userId)

  if (error) {
    console.error("Error fetching token balances:", error)
    return []
  }

  return data
}

export async function getUserNFTBalances(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("nft_balances").select("*, collections(*)").eq("user_id", userId)

  if (error) {
    console.error("Error fetching NFT balances:", error)
    return []
  }

  return data
}

export async function updateTokenBalance(userId: string, tokenId: string, amount: number) {
  const supabase = createClient()

  // Check if balance record exists
  const { data: existingBalance, error: checkError } = await supabase
    .from("token_balances")
    .select("*")
    .eq("user_id", userId)
    .eq("token_id", tokenId)
    .maybeSingle()

  if (checkError) {
    console.error("Error checking token balance:", checkError)
    return { error: checkError.message }
  }

  if (existingBalance) {
    // Update existing balance
    const { data, error } = await supabase
      .from("token_balances")
      .update({ amount, updated_at: new Date().toISOString() })
      .eq("id", existingBalance.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating token balance:", error)
      return { error: error.message }
    }

    return { data }
  } else {
    // Create new balance record
    const { data, error } = await supabase
      .from("token_balances")
      .insert([{ user_id: userId, token_id: tokenId, amount }])
      .select()
      .single()

    if (error) {
      console.error("Error creating token balance:", error)
      return { error: error.message }
    }

    return { data }
  }
}
