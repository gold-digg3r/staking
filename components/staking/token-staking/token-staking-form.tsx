"use client"

import { useState, useEffect } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { TokenIcon } from "@/components/ui/token-icon"
import { Loader2, AlertCircle, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WalletConnectButton } from "@/components/solana/wallet-connect-button"
import { TransactionStatus } from "@/components/solana/transaction-status"
import { stakeTokens } from "@/lib/solana/token-staking"
import { getTokenBalance } from "@/lib/solana/token"
import { TOKENS } from "@/lib/constants"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

interface TokenStakingFormProps {
  className?: string
}

export function TokenStakingForm({ className }: TokenStakingFormProps) {
  const { publicKey, wallet } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()
  const [amount, setAmount] = useState<string>("0")
  const [duration, setDuration] = useState<number>(30) // days
  const [loading, setLoading] = useState(false)
  const [selectedToken, setSelectedToken] = useState<string>("DIGR")
  const [autoCompound, setAutoCompound] = useState(false)
  const [tokenBalances, setTokenBalances] = useState<Record<string, number>>({
    DIGR: 0,
    GOLD: 0,
  })
  const [loadingBalances, setLoadingBalances] = useState(true)
  const [transaction, setTransaction] = useState<{
    signature: string | null
    status: "processing" | "confirmed" | "error" | null
    error: Error | null
  }>({
    signature: null,
    status: null,
    error: null,
  })

  // Fetch token balances when wallet is connected
  useEffect(() => {
    const fetchBalances = async () => {
      if (!publicKey) {
        setTokenBalances({ DIGR: 0, GOLD: 0 })
        setLoadingBalances(false)
        return
      }

      setLoadingBalances(true)
      try {
        // Fetch DIGR balance
        const digrBalance = await getTokenBalance(connection, publicKey, TOKENS.DIGR)

        // For demo purposes, we'll use a mock GOLD balance
        // In a real app, you would fetch the actual balance
        const goldBalance = 500.25

        setTokenBalances({
          DIGR: digrBalance,
          GOLD: goldBalance,
        })
      } catch (error) {
        console.error("Error fetching token balances:", error)
        // Set mock balances for demo
        setTokenBalances({
          DIGR: 1250.75,
          GOLD: 500.25,
        })
      } finally {
        setLoadingBalances(false)
      }
    }

    fetchBalances()
    // Set up an interval to refresh balances
    const intervalId = setInterval(fetchBalances, 30000)
    return () => clearInterval(intervalId)
  }, [connection, publicKey])

  const handleStake = async () => {
    if (!publicKey || !wallet) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to stake tokens",
        variant: "destructive",
      })
      return
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to stake",
        variant: "destructive",
      })
      return
    }

    const amountNum = Number.parseFloat(amount)
    const balance = tokenBalances[selectedToken]

    if (amountNum > balance) {
      toast({
        title: "Insufficient balance",
        description: `You don't have enough ${selectedToken} tokens. Your balance: ${balance.toFixed(2)}`,
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      // Get the token mint address
      const tokenMint = selectedToken === "DIGR" ? TOKENS.DIGR : TOKENS.GOLD

      // Reset transaction status
      setTransaction({
        signature: null,
        status: "processing",
        error: null,
      })

      // Stake tokens with auto-compound option
      const signature = await stakeTokens(connection, wallet, tokenMint, amountNum, duration, autoCompound)

      // Update transaction status
      setTransaction({
        signature,
        status: "confirmed",
        error: null,
      })

      toast({
        title: "Tokens Staked",
        description: `Successfully staked ${amount} ${selectedToken} for ${duration} days${
          autoCompound ? " with auto-compounding enabled" : ""
        }`,
      })

      // Reset form
      setAmount("0")

      // Refresh balances
      const newBalance = balance - amountNum
      setTokenBalances({
        ...tokenBalances,
        [selectedToken]: newBalance,
      })
    } catch (error) {
      console.error("Error staking tokens:", error)

      // Update transaction status
      setTransaction({
        signature: null,
        status: "error",
        error: error as Error,
      })

      toast({
        title: "Staking Failed",
        description: (error as Error).message || "There was an error staking your tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleMaxClick = () => {
    setAmount(tokenBalances[selectedToken]?.toString() || "0")
  }

  const calculateRewards = () => {
    // APR rates
    const aprRates = {
      DIGR: { 30: 12, 60: 15, 90: 18 },
      GOLD: { 30: 10, 60: 12, 90: 15 },
    }

    const apr = aprRates[selectedToken as keyof typeof aprRates]?.[duration as keyof typeof aprRates.DIGR] || 10
    const amountNum = Number.parseFloat(amount) || 0
    const daysInYear = 365

    // Calculate base rewards
    let rewards = ((amountNum * apr) / 100) * (duration / daysInYear)

    // Calculate compound rewards if enabled
    if (autoCompound) {
      // Simple compound interest formula: P(1 + r/n)^(nt)
      // where P is principal, r is rate, n is number of times compounded per year, t is time in years
      const compoundPeriods = duration / 7 // Compound weekly
      const ratePerPeriod = apr / 100 / (365 / 7) // Weekly rate
      const timeInYears = duration / 365

      rewards = amountNum * (Math.pow(1 + ratePerPeriod, compoundPeriods * timeInYears) - 1)
    }

    return rewards.toFixed(2)
  }

  const clearTransactionStatus = () => {
    setTransaction({
      signature: null,
      status: null,
      error: null,
    })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Stake Tokens</CardTitle>
        <CardDescription>Stake your tokens to earn rewards based on duration and amount</CardDescription>
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
            <p className="text-center text-muted-foreground mb-4">
              Connect your wallet to stake tokens and earn rewards
            </p>
            <WalletConnectButton />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token">Select Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger id="token" className="w-full">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DIGR">
                    <div className="flex items-center">
                      <TokenIcon symbol="DIGR" size="sm" className="mr-2" />
                      DIGR
                    </div>
                  </SelectItem>
                  <SelectItem value="GOLD">
                    <div className="flex items-center">
                      <TokenIcon symbol="GOLD" size="sm" className="mr-2" />
                      GOLD
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>
                  Balance:{" "}
                  {loadingBalances ? (
                    <Loader2 className="inline h-3 w-3 animate-spin" />
                  ) : (
                    `${tokenBalances[selectedToken]?.toFixed(2) || 0} ${selectedToken}`
                  )}
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center cursor-help">
                        <Info className="h-3 w-3 text-muted-foreground" />
                        <span className="ml-1">Transaction Fee</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs text-xs">
                        Staking requires a small SOL fee for the transaction (approximately 0.000005 SOL).
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Amount</Label>
                <Button variant="ghost" size="sm" className="h-5 text-xs px-2 text-gold-500" onClick={handleMaxClick}>
                  MAX
                </Button>
              </div>
              <div className="flex items-center">
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                  min="0"
                  step="0.01"
                />
                <div className="ml-2 bg-muted p-2 rounded-md">
                  <TokenIcon symbol={selectedToken} size="sm" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="duration">Staking Duration</Label>
                <span className="text-sm font-medium">{duration} days</span>
              </div>
              <Slider
                id="duration"
                min={30}
                max={90}
                step={30}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>30 days</span>
                <span>60 days</span>
                <span>90 days</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="auto-compound" checked={autoCompound} onCheckedChange={setAutoCompound} />
              <div>
                <Label htmlFor="auto-compound" className="cursor-pointer">
                  Auto-Compound Rewards
                </Label>
                <p className="text-xs text-muted-foreground">
                  Automatically reinvest rewards to earn compound interest
                </p>
              </div>
            </div>

            <div className="bg-gold-500/5 border border-gold-500/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Estimated Rewards</span>
                <div className="flex items-center">
                  <span className="font-bold text-gold-500">
                    {calculateRewards()} {selectedToken}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>APR</span>
                <span>
                  {selectedToken === "DIGR"
                    ? duration === 30
                      ? "12%"
                      : duration === 60
                        ? "15%"
                        : "18%"
                    : duration === 30
                      ? "10%"
                      : duration === 60
                        ? "12%"
                        : "15%"}
                  {autoCompound && " (compounded weekly)"}
                </span>
              </div>
              {autoCompound && (
                <div className="mt-2 text-xs text-gold-500 bg-gold-500/10 p-2 rounded">
                  <span className="font-medium">Auto-Compound Bonus:</span> Rewards are automatically reinvested weekly
                  for maximum returns
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleStake}
          disabled={!publicKey || loading || !amount || Number.parseFloat(amount) <= 0}
          className="w-full bg-gold-600 hover:bg-gold-700 text-black"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Staking...
            </>
          ) : (
            "Stake Tokens"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
