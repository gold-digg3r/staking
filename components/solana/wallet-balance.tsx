"use client"

import { useEffect, useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { TokenIcon } from "@/components/ui/token-icon"
import { Loader2 } from "lucide-react"

interface WalletBalanceProps {
  showSol?: boolean
  showDigr?: boolean
  className?: string
}

export function WalletBalance({ showSol = true, showDigr = true, className }: WalletBalanceProps) {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [solBalance, setSolBalance] = useState<number | null>(null)
  const [digrBalance, setDigrBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) {
        setSolBalance(null)
        setDigrBalance(null)
        return
      }

      setLoading(true)
      try {
        // Fetch SOL balance
        const balance = await connection.getBalance(publicKey)
        setSolBalance(balance / LAMPORTS_PER_SOL)

        // For DIGR token, we would need to fetch the token account
        // This is a placeholder - in a real app, you'd fetch the actual token balance
        setDigrBalance(1250.75)
      } catch (error) {
        console.error("Error fetching balances:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBalances()
    // Set up an interval to refresh balances
    const intervalId = setInterval(fetchBalances, 30000)
    return () => clearInterval(intervalId)
  }, [connection, publicKey])

  if (!publicKey) {
    return null
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {loading ? (
        <div className="flex items-center">
          <Loader2 className="h-4 w-4 animate-spin mr-2 text-gold-500" />
          <span className="text-sm text-muted-foreground">Loading balances...</span>
        </div>
      ) : (
        <>
          {showSol && solBalance !== null && (
            <div className="flex items-center">
              <TokenIcon symbol="SOL" size="sm" className="mr-1.5" />
              <span className="font-medium">{solBalance.toFixed(2)} SOL</span>
            </div>
          )}
          {showDigr && digrBalance !== null && (
            <div className="flex items-center">
              <TokenIcon symbol="DIGR" size="sm" className="mr-1.5" />
              <span className="font-medium">{digrBalance.toFixed(2)} DIGR</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
