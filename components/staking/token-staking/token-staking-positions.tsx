"use client"

import { useState, useEffect } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { TokenIcon } from "@/components/ui/token-icon"
import { Loader2, Clock, AlertCircle, RefreshCw } from "lucide-react"
import {
  unstakeTokens,
  claimStakingRewards,
  getTokenStakingPositions,
  toggleAutoCompound,
} from "@/lib/solana/token-staking"
import { TransactionStatus } from "@/components/solana/transaction-status"
import { WalletConnectButton } from "@/components/solana/wallet-connect-button"
import { formatDistanceToNow, format } from "date-fns"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TokenStakingPositionsProps {
  className?: string
}

export function TokenStakingPositions({ className }: TokenStakingPositionsProps) {
  const { publicKey, wallet } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()
  const [positions, setPositions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<Record<string, string>>({})
  const [transaction, setTransaction] = useState<{
    signature: string | null
    status: "processing" | "confirmed" | "error" | null
    error: Error | null
  }>({
    signature: null,
    status: null,
    error: null,
  })

  // Fetch staking positions when wallet is connected
  useEffect(() => {
    const fetchPositions = async () => {
      if (!publicKey) {
        setPositions([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        // Fetch positions from the blockchain
        const stakingPositions = await getTokenStakingPositions(connection, publicKey)

        // If no positions are found, use mock data for demo
        if (stakingPositions.length === 0) {
          // Mock data for demonstration
          const mockPositions = [
            {
              address: "position1",
              tokenMint: "DIGR",
              amount: BigInt(1000 * 1e9), // 1000 DIGR with 9 decimals
              startTime: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
              duration: 30 * 24 * 60 * 60, // 30 days in seconds
              endTime: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
              claimed: false,
              rewards: 15.25,
              autoCompound: true,
              lastCompoundTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
            },
            {
              address: "position2",
              tokenMint: "GOLD",
              amount: BigInt(500 * 1e6), // 500 GOLD with 6 decimals
              startTime: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
              duration: 60 * 24 * 60 * 60, // 60 days in seconds
              endTime: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
              claimed: false,
              rewards: 25.5,
              autoCompound: false,
              lastCompoundTime: 0,
            },
          ]
          setPositions(mockPositions)
        } else {
          setPositions(stakingPositions)
        }
      } catch (error) {
        console.error("Error fetching staking positions:", error)
        toast({
          title: "Error",
          description: "Failed to load staking positions. Please try again later.",
          variant: "destructive",
        })

        // Use mock data for demo
        const mockPositions = [
          {
            address: "position1",
            tokenMint: "DIGR",
            amount: BigInt(1000 * 1e9), // 1000 DIGR with 9 decimals
            startTime: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
            duration: 30 * 24 * 60 * 60, // 30 days in seconds
            endTime: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
            claimed: false,
            rewards: 15.25,
            autoCompound: true,
            lastCompoundTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
          },
          {
            address: "position2",
            tokenMint: "GOLD",
            amount: BigInt(500 * 1e6), // 500 GOLD with 6 decimals
            startTime: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
            duration: 60 * 24 * 60 * 60, // 60 days in seconds
            endTime: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15 days from now
            claimed: false,
            rewards: 25.5,
            autoCompound: false,
            lastCompoundTime: 0,
          },
        ]
        setPositions(mockPositions)
      } finally {
        setLoading(false)
      }
    }

    fetchPositions()
    // Set up an interval to refresh positions
    const intervalId = setInterval(fetchPositions, 60000)
    return () => clearInterval(intervalId)
  }, [connection, publicKey, toast])

  const handleUnstake = async (positionAddress: string) => {
    if (!publicKey || !wallet) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to unstake tokens",
        variant: "destructive",
      })
      return
    }

    setActionLoading({ ...actionLoading, [positionAddress]: "unstake" })
    try {
      // Reset transaction status
      setTransaction({
        signature: null,
        status: "processing",
        error: null,
      })

      // Unstake tokens
      const signature = await unstakeTokens(connection, wallet, positionAddress)

      // Update transaction status
      setTransaction({
        signature,
        status: "confirmed",
        error: null,
      })

      toast({
        title: "Tokens Unstaked",
        description: "Your tokens have been successfully unstaked.",
      })

      // Remove the position from the list
      setPositions(positions.filter((p) => p.address !== positionAddress))
    } catch (error) {
      console.error("Error unstaking tokens:", error)

      // Update transaction status
      setTransaction({
        signature: null,
        status: "error",
        error: error as Error,
      })

      toast({
        title: "Unstaking Failed",
        description: (error as Error).message || "There was an error unstaking your tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading({ ...actionLoading, [positionAddress]: "" })
    }
  }

  const handleClaimRewards = async (positionAddress: string) => {
    if (!publicKey || !wallet) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to claim rewards",
        variant: "destructive",
      })
      return
    }

    setActionLoading({ ...actionLoading, [positionAddress]: "claim" })
    try {
      // Reset transaction status
      setTransaction({
        signature: null,
        status: "processing",
        error: null,
      })

      // Claim rewards
      const signature = await claimStakingRewards(connection, wallet, positionAddress)

      // Update transaction status
      setTransaction({
        signature,
        status: "confirmed",
        error: null,
      })

      toast({
        title: "Rewards Claimed",
        description: "Your staking rewards have been successfully claimed.",
      })

      // Update the position to mark rewards as claimed
      setPositions(positions.map((p) => (p.address === positionAddress ? { ...p, claimed: true, rewards: 0 } : p)))
    } catch (error) {
      console.error("Error claiming rewards:", error)

      // Update transaction status
      setTransaction({
        signature: null,
        status: "error",
        error: error as Error,
      })

      toast({
        title: "Claiming Failed",
        description: (error as Error).message || "There was an error claiming your rewards. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading({ ...actionLoading, [positionAddress]: "" })
    }
  }

  const handleToggleAutoCompound = async (positionAddress: string, currentValue: boolean) => {
    if (!publicKey || !wallet) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to update auto-compounding",
        variant: "destructive",
      })
      return
    }

    setActionLoading({ ...actionLoading, [positionAddress]: "autoCompound" })
    try {
      // Reset transaction status
      setTransaction({
        signature: null,
        status: "processing",
        error: null,
      })

      // Toggle auto-compound
      const signature = await toggleAutoCompound(connection, wallet, positionAddress, !currentValue)

      // Update transaction status
      setTransaction({
        signature,
        status: "confirmed",
        error: null,
      })

      toast({
        title: "Auto-Compound Updated",
        description: `Auto-compounding has been ${!currentValue ? "enabled" : "disabled"} for this position.`,
      })

      // Update the position to reflect the new auto-compound setting
      setPositions(positions.map((p) => (p.address === positionAddress ? { ...p, autoCompound: !currentValue } : p)))
    } catch (error) {
      console.error("Error toggling auto-compound:", error)

      // Update transaction status
      setTransaction({
        signature: null,
        status: "error",
        error: error as Error,
      })

      toast({
        title: "Update Failed",
        description: (error as Error).message || "There was an error updating auto-compounding. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading({ ...actionLoading, [positionAddress]: "" })
    }
  }

  const clearTransactionStatus = () => {
    setTransaction({
      signature: null,
      status: null,
      error: null,
    })
  }

  const formatAmount = (amount: bigint, tokenMint: string) => {
    const decimals = tokenMint === "DIGR" ? 9 : 6
    return Number(amount) / Math.pow(10, decimals)
  }

  const getTokenSymbol = (tokenMint: string) => {
    return tokenMint === "DIGR" ? "DIGR" : "GOLD"
  }

  const isStakingEnded = (endTime: number) => {
    return endTime < Date.now()
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Your Staked Tokens</CardTitle>
        <CardDescription>Manage your token staking positions and claim rewards</CardDescription>
      </CardHeader>
      <CardContent>
        {transaction.status && (
          <div className="mb-6">
            <TransactionStatus
              signature={transaction.signature}
              status={transaction.status}
              error={transaction.error}
              onClose={clearTransactionStatus}
            />
          </div>
        )}

        {!publicKey ? (
          <div className="flex flex-col items-center justify-center py-6">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground mb-4">Connect your wallet to view your staking positions</p>
            <WalletConnectButton />
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gold-500" />
          </div>
        ) : positions.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No tokens staked yet</h3>
            <p className="text-muted-foreground mt-2">Stake your tokens to start earning rewards</p>
          </div>
        ) : (
          <div className="space-y-6">
            {positions.map((position) => (
              <div key={position.address} className="border border-gold-500/10 rounded-lg p-4 bg-gold-500/5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <TokenIcon symbol={getTokenSymbol(position.tokenMint)} size="md" className="mr-2" />
                    <div>
                      <h3 className="font-semibold">
                        {formatAmount(position.amount, position.tokenMint).toLocaleString()}{" "}
                        {getTokenSymbol(position.tokenMint)}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Staked {formatDistanceToNow(new Date(position.startTime), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">
                        {isStakingEnded(position.endTime)
                          ? "Staking period ended"
                          : `Ends ${formatDistanceToNow(new Date(position.endTime), { addSuffix: true })}`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(position.endTime), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Rewards</p>
                    <p className="font-medium text-gold-500">
                      {position.rewards} {getTokenSymbol(position.tokenMint)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{position.duration / (24 * 60 * 60)} days</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">
                      {isStakingEnded(position.endTime) ? (
                        <span className="text-green-500">Ready to unstake</span>
                      ) : (
                        <span className="text-blue-500">Staking</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Auto-compound section */}
                <div className="flex justify-between items-center p-2 bg-gold-500/10 rounded-md mb-4">
                  <div className="flex items-center">
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${position.autoCompound ? "text-gold-500" : "text-muted-foreground"}`}
                    />
                    <div>
                      <p className="text-sm font-medium">Auto-Compound</p>
                      {position.autoCompound && position.lastCompoundTime > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Last compounded{" "}
                          {formatDistanceToNow(new Date(position.lastCompoundTime), { addSuffix: true })}
                        </p>
                      )}
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Switch
                            checked={position.autoCompound}
                            onCheckedChange={() => handleToggleAutoCompound(position.address, position.autoCompound)}
                            disabled={
                              actionLoading[position.address] === "autoCompound" || isStakingEnded(position.endTime)
                            }
                          />
                          {actionLoading[position.address] === "autoCompound" && (
                            <Loader2 className="ml-2 h-3 w-3 animate-spin" />
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-xs">
                          {isStakingEnded(position.endTime)
                            ? "Auto-compound cannot be changed after staking period ends"
                            : "Automatically reinvest rewards weekly to earn compound interest"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
                    onClick={() => handleClaimRewards(position.address)}
                    disabled={
                      position.rewards <= 0 ||
                      actionLoading[position.address] === "claim" ||
                      actionLoading[position.address] === "unstake" ||
                      actionLoading[position.address] === "autoCompound"
                    }
                  >
                    {actionLoading[position.address] === "claim" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Claiming...
                      </>
                    ) : (
                      "Claim Rewards"
                    )}
                  </Button>
                  <Button
                    variant={isStakingEnded(position.endTime) ? "default" : "outline"}
                    className={
                      isStakingEnded(position.endTime)
                        ? "flex-1 bg-gold-600 hover:bg-gold-700 text-black"
                        : "flex-1 border-red-500/50 text-red-500 hover:bg-red-500/10"
                    }
                    onClick={() => handleUnstake(position.address)}
                    disabled={
                      actionLoading[position.address] === "unstake" ||
                      actionLoading[position.address] === "claim" ||
                      actionLoading[position.address] === "autoCompound"
                    }
                  >
                    {actionLoading[position.address] === "unstake" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Unstaking...
                      </>
                    ) : (
                      "Unstake"
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
