"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useToast } from "@/components/ui/use-toast"

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  userId: string | null
  walletAddress: string | null
  signIn: () => Promise<boolean>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  userId: null,
  walletAddress: null,
  signIn: async () => false,
  signOut: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { publicKey, signMessage, connected, disconnect } = useWallet()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)
  const { toast } = useToast()

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session")
        const data = await response.json()

        if (data.authenticated) {
          setIsAuthenticated(true)
          setUserId(data.userId)
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Update auth state when wallet connection changes
  useEffect(() => {
    if (!connected) {
      setIsAuthenticated(false)
      setUserId(null)
    }
  }, [connected])

  const signIn = async (): Promise<boolean> => {
    if (!publicKey || !signMessage) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to sign in",
        variant: "destructive",
      })
      return false
    }

    try {
      setIsLoading(true)
      const walletAddress = publicKey.toString()

      // Get the message to sign from the server
      const messageResponse = await fetch(`/api/auth/wallet?wallet=${walletAddress}`)
      const messageData = await messageResponse.json()

      if (!messageResponse.ok) {
        throw new Error(messageData.error || "Failed to get sign message")
      }

      // Request signature from the wallet
      const encodedMessage = new TextEncoder().encode(messageData.message)
      const signature = await signMessage(encodedMessage)

      // Send the signature to the server for verification
      const authResponse = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletAddress,
          signature: Buffer.from(signature).toString("base64"),
          message: messageData.message,
        }),
      })

      const authData = await authResponse.json()

      if (!authResponse.ok) {
        throw new Error(authData.error || "Authentication failed")
      }

      setIsAuthenticated(true)
      setUserId(authData.user.id)

      toast({
        title: "Authentication successful",
        description: "You are now signed in with your wallet",
      })

      return true
    } catch (error) {
      console.error("Authentication error:", error)

      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Failed to authenticate with wallet",
        variant: "destructive",
      })

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      disconnect()
      setIsAuthenticated(false)
      setUserId(null)

      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      })
    } catch (error) {
      console.error("Error signing out:", error)

      toast({
        title: "Sign out failed",
        description: "There was an error signing out",
        variant: "destructive",
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        userId,
        walletAddress: publicKey?.toString() || null,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
