import { type NextRequest, NextResponse } from "next/server"
import { generateNonce } from "@/app/actions/wallet-auth"

export async function GET(request: NextRequest) {
  try {
    // Get the wallet address from the query parameters
    const searchParams = request.nextUrl.searchParams
    const walletAddress = searchParams.get("wallet")

    if (!walletAddress) {
      return NextResponse.json({ error: "Wallet address is required" }, { status: 400 })
    }

    // Generate a nonce for this wallet
    const nonce = await generateNonce(walletAddress)

    // Create a message for the user to sign
    const timestamp = new Date().toISOString()
    const message = `Sign this message to authenticate with Gold Digger: ${walletAddress}\nNonce: ${nonce}\nTimestamp: ${timestamp}`

    return NextResponse.json({ message })
  } catch (error) {
    console.error("Error generating sign message:", error)
    return NextResponse.json({ error: "Failed to generate sign message" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { walletAddress, signature, message } = body

    if (!walletAddress || !signature || !message) {
      return NextResponse.json({ error: "Wallet address, signature, and message are required" }, { status: 400 })
    }

    // In a production environment, verify the signature here
    // For now, we'll assume it's valid

    // Create a session for the user
    // In a production environment, you would store this in a database
    const session = {
      id: crypto.randomUUID(),
      userId: walletAddress,
      walletAddress,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    }

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: {
        id: walletAddress,
        walletAddress,
      },
      session,
    })
  } catch (error) {
    console.error("Error authenticating with wallet:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
