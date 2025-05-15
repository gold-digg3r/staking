"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export function WalletAuth() {
  const { publicKey, signMessage, connected } = useWallet()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [authStatus, setAuthStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleAuthenticate = async () => {
    if (!publicKey || !signMessage) return

    try {
      setIsAuthenticating(true)
      setAuthStatus({})

      // Get the message to sign from the server
      const walletAddress = publicKey.toString()
      const response = await fetch(`/api/auth/wallet?wallet=${walletAddress}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get sign message")
      }

      // Request signature from the wallet
      const encodedMessage = new TextEncoder().encode(data.message)
      const signature = await signMessage(encodedMessage)

      // Send the signature to the server for verification
      const verifyResponse = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          signature: Buffer.from(signature).toString("base64"),
          message: data.message,
        }),
      })

      const verifyData = await verifyResponse.json()

      if (!verifyResponse.ok) {
        throw new Error(verifyData.error || "Authentication failed")
      }

      setAuthStatus({
        success: true,
        message: "Authentication successful",
      })
    } catch (error) {
      console.error("Authentication error:", error)
      setAuthStatus({
        success: false,
        message: error instanceof Error ? error.message : "Authentication failed",
      })
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (!connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Wallet Authentication</CardTitle>
          <CardDescription>Connect your wallet to authenticate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please connect your Solana wallet to authenticate with Gold Digger.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Authentication</CardTitle>
        <CardDescription>Sign a message to authenticate</CardDescription>
      </CardHeader>
      <CardContent>
        {publicKey && (
          <div className="mb-4">
            <p className="text-sm font-medium">Connected Wallet</p>
            <p className="text-xs text-muted-foreground break-all">{publicKey.toString()}</p>
          </div>
        )}

        {authStatus.message && (
          <Alert className={authStatus.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}>
            <AlertDescription>{authStatus.message}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleAuthenticate} disabled={isAuthenticating || !signMessage}>
          {isAuthenticating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Authenticating...
            </>
          ) : (
            "Authenticate with Wallet"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
