"use server"

import { createClient } from "@/utils/supabase/server"

export async function getTokens() {
  const supabase = createClient()

  const { data, error } = await supabase.from("tokens").select("*").order("name", { ascending: true })

  if (error) {
    console.error("Error fetching tokens:", error)
    return []
  }

  return data
}

export async function getToken(tokenId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("tokens").select("*").eq("id", tokenId).single()

  if (error) {
    console.error("Error fetching token:", error)
    return null
  }

  return data
}

export async function getTokenPrice(tokenId: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("token_prices")
    .select("*")
    .eq("token_id", tokenId)
    .order("timestamp", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching token price:", error)
    return null
  }

  return data
}

export async function getTokenPriceHistory(tokenId: string, days = 30) {
  const supabase = createClient()

  // Calculate the date range
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const { data, error } = await supabase
    .from("token_prices")
    .select("price, timestamp")
    .eq("token_id", tokenId)
    .gte("timestamp", startDate.toISOString())
    .lte("timestamp", endDate.toISOString())
    .order("timestamp", { ascending: true })

  if (error) {
    console.error("Error fetching token price history:", error)
    return []
  }

  return data
}
