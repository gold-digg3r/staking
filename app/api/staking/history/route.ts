import { NextResponse } from "next/server"

// Only export the GET function, nothing else
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const owner = searchParams.get("owner")

    if (!owner) {
      return NextResponse.json({ success: false, error: "Owner parameter is required" }, { status: 400 })
    }

    // data for now
    const mockHistory = [
      {
        id: "history-1",
        user_id: owner,
        nft_id: "nft-123",
        pool_id: "pool-1",
        type: "stake",
        amount: null,
        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "history-2",
        user_id: owner,
        nft_id: "nft-456",
        pool_id: "pool-1",
        type: "unstake",
        amount: null,
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    return NextResponse.json({ success: true, data: mockHistory })
  } catch (error) {
    console.error("Error fetching staking history:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch staking history" }, { status: 500 })
  }
}
