"use server"

import { createClient } from "@/utils/supabase/server"

export async function saveWalletAddress(userId: string, walletAddress: string) {
  const supabase = createClient()

  // Check if wallet already exists for this user
  const { data: existingWallet, error: checkError } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .eq("address", walletAddress)
    .maybeSingle()

  if (checkError) {
    console.error("Error checking existing wallet:", checkError)
    return { error: checkError.message }
  }

  // If wallet already exists, return it
  if (existingWallet) {
    return { data: existingWallet }
  }

  // Otherwise, insert new wallet
  const { data, error } = await supabase
    .from("wallets")
    .insert([{ user_id: userId, address: walletAddress, is_primary: true }])
    .select()
    .single()

  if (error) {
    console.error("Error saving wallet address:", error)
    return { error: error.message }
  }

  return { data }
}

export async function getUserWallets(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .order("is_primary", { ascending: false })

  if (error) {
    console.error("Error fetching user wallets:", error)
    return []
  }

  return data
}

export async function setPrimaryWallet(userId: string, walletId: string) {
  const supabase = createClient()

  // First, set all user wallets to non-primary
  const { error: resetError } = await supabase.from("wallets").update({ is_primary: false }).eq("user_id", userId)

  if (resetError) {
    console.error("Error resetting primary wallets:", resetError)
    return { error: resetError.message }
  }

  // Then set the selected wallet as primary
  const { data, error } = await supabase
    .from("wallets")
    .update({ is_primary: true })
    .eq("id", walletId)
    .eq("user_id", userId) // Security check
    .select()
    .single()

  if (error) {
    console.error("Error setting primary wallet:", error)
    return { error: error.message }
  }

  return { data }
}
