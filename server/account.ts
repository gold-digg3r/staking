"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateAccountSettings(userId: string, settings: any) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("user_settings")
    .upsert({
      user_id: userId,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error updating account settings:", error)
    return { error: error.message }
  }

  revalidatePath("/account")
  return { data }
}

export async function getAccountSettings(userId: string) {
  const supabase = createClient()

  const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned"
    console.error("Error fetching account settings:", error)
    return null
  }

  // Return default settings if none exist
  if (!data) {
    return {
      user_id: userId,
      notifications_enabled: true,
      email_notifications: true,
      theme: "system",
      language: "en",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  return data
}

export async function deleteAccount(userId: string) {
  const supabase = createClient()

  // In a real app, you might want to implement a soft delete first
  // or have a more complex deletion process

  const { error } = await supabase.auth.admin.deleteUser(userId)

  if (error) {
    console.error("Error deleting account:", error)
    return { error: error.message }
  }

  return { success: true }
}
