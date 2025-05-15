"use client"

import { useState, useEffect } from "react"
import { useConnection } from "@solana/wallet-adapter-react"
import { AlertCircle, CheckCircle, Clock, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ENV } from "@/lib/constants"

interface TransactionStatusProps {
  signature: string | null
  status: "processing" | "confirmed" | "error" | null
  error?: Error | null
  onClose: () => void
}

export function TransactionStatus({ signature, status, error, onClose }: TransactionStatusProps) {
  const { connection } = useConnection()
  const [confirmations, setConfirmations] = useState<number>(0)

  useEffect(() => {
    if (!signature || status !== "processing") return

    let intervalId: NodeJS.Timeout

    const checkConfirmation = async () => {
      try {
        const signatureStatus = await connection.getSignatureStatus(signature)
        if (signatureStatus.value) {
          setConfirmations(signatureStatus.value.confirmations || 0)
        }
      } catch (error) {
        console.error("Error checking transaction status:", error)
      }
    }

    // Check immediately
    checkConfirmation()

    // Then check every 2 seconds
    intervalId = setInterval(checkConfirmation, 2000)

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [signature, status, connection])

  if (!status) return null

  const getExplorerUrl = (signature: string) => {
    const network = ENV.SOLANA_NETWORK
    return `https://explorer.solana.com/tx/${signature}?cluster=${network}`
  }

  return (
    <Alert
      className={`
        ${status === "processing" ? "border-blue-500/50 bg-blue-500/10" : ""}
        ${status === "confirmed" ? "border-green-500/50 bg-green-500/10" : ""}
        ${status === "error" ? "border-red-500/50 bg-red-500/10" : ""}
      `}
    >
      <div className="flex items-start">
        <div className="mr-2 mt-0.5">
          {status === "processing" && <Clock className="h-5 w-5 text-blue-500" />}
          {status === "confirmed" && <CheckCircle className="h-5 w-5 text-green-500" />}
          {status === "error" && <AlertCircle className="h-5 w-5 text-red-500" />}
        </div>
        <div className="flex-1">
          <AlertTitle>
            {status === "processing" && "Transaction Processing"}
            {status === "confirmed" && "Transaction Confirmed"}
            {status === "error" && "Transaction Failed"}
          </AlertTitle>
          <AlertDescription className="mt-2">
            {status === "processing" && (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-500" />
                <span>Waiting for confirmation ({confirmations} confirmations)</span>
              </div>
            )}
            {status === "confirmed" && "Your transaction has been confirmed on the Solana blockchain."}
            {status === "error" && (
              <span className="text-red-500">
                {error?.message || "An error occurred while processing your transaction."}
              </span>
            )}

            {signature && (
              <div className="mt-2">
                <a
                  href={getExplorerUrl(signature)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-blue-500 hover:underline"
                >
                  View on Solana Explorer
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            )}
          </AlertDescription>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className={`
                ${status === "processing" ? "border-blue-500/50 text-blue-500 hover:bg-blue-500/10" : ""}
                ${status === "confirmed" ? "border-green-500/50 text-green-500 hover:bg-green-500/10" : ""}
                ${status === "error" ? "border-red-500/50 text-red-500 hover:bg-red-500/10" : ""}
              `}
            >
              {status === "processing" ? "Hide" : "Close"}
            </Button>
          </div>
        </div>
      </div>
    </Alert>
  )
}
