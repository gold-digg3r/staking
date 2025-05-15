import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get("owner")

    if (!owner) {
      return NextResponse.json({ success: false, error: "Owner parameter is required" }, { status: 400 })
    }

    // Mock data for now
    const stats = {
      total_staked: 5,
      total_rewards: 250,
      total_claimed: 100,
      total_pending: 150,
    }

    return NextResponse.json({ success: true, data: stats })
  } catch (error) {
    console.error("Error fetching staking stats:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch staking stats" }, { status: 500 })
  }
}
