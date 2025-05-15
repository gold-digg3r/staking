import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Mock data for now
    const pool = {
      id,
      name: "Gold Digger Staking Pool",
      description: "Stake your Gold Digger NFTs to earn DIGR tokens",
      reward_token_mint: "GLD1234567890abcdef",
      reward_token_symbol: "DIGR",
      reward_token_icon: "/gold-token-icon.png",
      reward_rate: 10,
      total_staked: 156,
      requires_collection: "Gold Digger",
      min_staking_period: 7,
      lockup_period: 2,
      early_unstake_penalty: 20,
      is_active: true,
      created_at: new Date("2023-01-01").toISOString(),
      updated_at: new Date("2023-05-15").toISOString(),
    }

    if (!pool) {
      return NextResponse.json({ success: false, error: "Staking pool not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: pool })
  } catch (error) {
    console.error("Error fetching staking pool:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch staking pool" }, { status: 500 })
  }
}
