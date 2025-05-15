"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/components/auth/auth-provider"
import { useWallet } from "@solana/wallet-adapter-react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Copy, ExternalLink, Shield, User, History, Coins, Pickaxe } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  return (
    <ProtectedRoute
      fallback={
        <div className="container py-12">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>Please connect your wallet and authenticate to view your profile</CardDescription>
            </CardHeader>
          </Card>
        </div>
      }
    >
      <ProfileContent />
    </ProtectedRoute>
  )
}

function ProfileContent() {
  const { isAuthenticated, walletAddress } = useAuth()
  const { publicKey } = useWallet()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openExplorer = () => {
    if (walletAddress) {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
      const explorerUrl = `https://explorer.solana.com/address/${walletAddress}?cluster=${network}`
      window.open(explorerUrl, "_blank")
    }
  }

  if (!isAuthenticated || !walletAddress) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your wallet information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                  <User className="h-12 w-12 text-amber-600 dark:text-amber-400" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Wallet Address</p>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-mono break-all">{walletAddress}</p>
                  <Button variant="ghost" size="icon" onClick={handleCopyAddress}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Button variant="outline" size="sm" onClick={openExplorer} className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Explorer
                </Button>
                <div className="flex items-center justify-center space-x-2 py-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-500">Authenticated</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="assets">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="assets">
                <Coins className="mr-2 h-4 w-4" />
                Assets
              </TabsTrigger>
              <TabsTrigger value="activity">
                <History className="mr-2 h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger value="settings">
                <User className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assets">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assets</CardTitle>
                  <CardDescription>View your tokens and NFTs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AssetCard name="DIGR Token" balance="1,245.32" icon="/digr.svg" change="+5.2%" positive={true} />
                    <AssetCard name="SOL" balance="3.75" icon="/sol.png" change="-1.8%" positive={false} />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">Your NFTs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <NftCard
                        name="Gold Digger #1234"
                        image="/placeholder-j41as.png"
                        collection="Gold Digger"
                        rarity="Rare"
                      />
                      <NftCard
                        name="Jailbird #5678"
                        image="/placeholder-sh5gk.png"
                        collection="Jailbirds"
                        rarity="Epic"
                      />
                      <NftCard
                        name="Syndicate #9012"
                        image="/placeholder-5qrah.png"
                        collection="Syndicate"
                        rarity="Legendary"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent transactions and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ActivityItem
                      type="Stake"
                      description="Staked Gold Digger #1234"
                      timestamp="2 hours ago"
                      amount="+0.25 DIGR/day"
                    />
                    <ActivityItem
                      type="Mission"
                      description="Completed 'Heist' mission"
                      timestamp="1 day ago"
                      amount="+125 DIGR"
                    />
                    <ActivityItem
                      type="Claim"
                      description="Claimed staking rewards"
                      timestamp="3 days ago"
                      amount="+45.75 DIGR"
                    />
                    <ActivityItem
                      type="Unstake"
                      description="Unstaked Jailbird #5678"
                      timestamp="1 week ago"
                      amount="-0.15 DIGR/day"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Settings functionality coming soon. Stay tuned for updates!</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function AssetCard({
  name,
  balance,
  icon,
  change,
  positive,
}: {
  name: string
  balance: string
  icon: string
  change: string
  positive: boolean
}) {
  return (
    <div className="flex items-center p-4 border rounded-lg">
      <div className="mr-4">
        <Image src={icon || "/placeholder.svg"} alt={name} width={40} height={40} />
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{name}</h4>
        <p className="text-2xl font-bold">{balance}</p>
      </div>
      <div className={`text-sm font-medium ${positive ? "text-green-600" : "text-red-600"}`}>{change}</div>
    </div>
  )
}

function NftCard({
  name,
  image,
  collection,
  rarity,
}: {
  name: string
  image: string
  collection: string
  rarity: string
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-square relative">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
      </div>
      <div className="p-3">
        <h4 className="font-medium text-sm truncate">{name}</h4>
        <div className="flex justify-between items-center mt-1">
          <p className="text-xs text-muted-foreground">{collection}</p>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
            {rarity}
          </span>
        </div>
      </div>
    </div>
  )
}

function ActivityItem({
  type,
  description,
  timestamp,
  amount,
}: {
  type: string
  description: string
  timestamp: string
  amount: string
}) {
  return (
    <div className="flex items-center p-3 border rounded-lg">
      <div className="mr-4">
        {type === "Stake" && <Coins className="h-8 w-8 text-green-500" />}
        {type === "Mission" && <Pickaxe className="h-8 w-8 text-amber-500" />}
        {type === "Claim" && <Coins className="h-8 w-8 text-blue-500" />}
        {type === "Unstake" && <Coins className="h-8 w-8 text-red-500" />}
      </div>
      <div className="flex-1">
        <h4 className="font-medium">{description}</h4>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
      <div className={`text-sm font-medium ${amount.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
        {amount}
      </div>
    </div>
  )
}
