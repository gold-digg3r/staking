"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ExternalLink } from "lucide-react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"

interface StakedNFT {
  id: string
  name: string
  image: string
  stakedAt: string
  poolId: string
  poolName: string
  rewards: number
  collection: string
}

export function StakedNftsList() {
  const [stakedNfts, setStakedNfts] = useState<StakedNFT[]>([])
  const [loading, setLoading] = useState(true)
  const [unstaking, setUnstaking] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  // Use useCallback to prevent unnecessary re-renders
  const fetchStakedNfts = useCallback(async () => {
    try {
      // In a real implementation, this would fetch from your API
      // For now, we'll use mock data
      const mockData: StakedNFT[] = [
        {
          id: "nft1",
          name: "Jailbird #1234",
          image: "/placeholder-ln8mu.png",
          stakedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          poolId: "pool1",
          poolName: "Jailbreak Pool",
          rewards: 125.5,
          collection: "Jailbirds",
        },
        {
          id: "nft2",
          name: "Jailbird #5678",
          image: "/placeholder-pkftx.png",
          stakedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
          poolId: "pool2",
          poolName: "Diamond Hands Pool",
          rewards: 237.8,
          collection: "Jailbirds",
        },
        {
          id: "nft3",
          name: "Gold Digger #9012",
          image: "/placeholder-dforw.png",
          stakedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
          poolId: "pool3",
          poolName: "Gold Rush Pool",
          rewards: 342.1,
          collection: "Gold Diggers",
        },
      ]

      setTimeout(() => {
        setStakedNfts(mockData)
        setLoading(false)
      }, 800)
    } catch (error) {
      console.error("Error fetching staked NFTs:", error)
      toast({
        title: "Error",
        description: "Failed to load staked NFTs. Please try again.",
        variant: "destructive",
      })
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchStakedNfts()
  }, [fetchStakedNfts])

  const handleUnstake = async (nftId: string) => {
    setUnstaking((prev) => ({ ...prev, [nftId]: true }))

    try {
      // In a real implementation, this would call your unstake API
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setStakedNfts((prev) => prev.filter((nft) => nft.id !== nftId))

      toast({
        title: "Success",
        description: "NFT unstaked successfully!",
      })
    } catch (error) {
      console.error("Error unstaking NFT:", error)
      toast({
        title: "Error",
        description: "Failed to unstake NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUnstaking((prev) => ({ ...prev, [nftId]: false }))
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (stakedNfts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No NFTs staked yet</h3>
        <p className="text-muted-foreground mt-2">Stake your NFTs to start earning rewards</p>
        <Button className="mt-4 bg-gold-300 hover:bg-gold-300/90 text-black">Stake NFTs</Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Featured NFT - Larger vertical card */}
      <div className="lg:col-span-4 flex flex-col">
        <Card className="flex-1 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full">
          <div className="relative aspect-square">
            <Image
              src={stakedNfts[0].image || "/placeholder.svg"}
              alt={stakedNfts[0].name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-2 right-2">
              <span className="bg-black/60 text-gold-300 text-xs px-2 py-1 rounded-full">
                {stakedNfts[0].collection}
              </span>
            </div>
          </div>
          <CardContent className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-lg">{stakedNfts[0].name}</h3>
            <div className="mt-2 space-y-2 text-sm flex-1">
              <p className="text-muted-foreground">Pool: {stakedNfts[0].poolName}</p>
              <p className="text-muted-foreground">
                Staked: {formatDistanceToNow(new Date(stakedNfts[0].stakedAt), { addSuffix: true })}
              </p>
              <p className="font-medium text-gold-300">Rewards: {stakedNfts[0].rewards.toFixed(2)} DIGR</p>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                className="flex-1"
                onClick={() => handleUnstake(stakedNfts[0].id)}
                disabled={unstaking[stakedNfts[0].id]}
              >
                {unstaking[stakedNfts[0].id] ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Unstaking...
                  </>
                ) : (
                  "Unstake"
                )}
              </Button>
              <Button variant="outline" size="icon">
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View on Explorer</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side-by-side smaller cards */}
      <div className="lg:col-span-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {stakedNfts.slice(1).map((nft) => (
            <Card key={nft.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
              <div className="flex flex-row h-full">
                <div className="relative w-1/3">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <span className="bg-black/60 text-gold-300 text-xs px-2 py-1 rounded-full">{nft.collection}</span>
                  </div>
                </div>
                <CardContent className="p-4 w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold">{nft.name}</h3>
                    <div className="mt-1 space-y-1 text-xs">
                      <p className="text-muted-foreground">Pool: {nft.poolName}</p>
                      <p className="text-muted-foreground">
                        Staked: {formatDistanceToNow(new Date(nft.stakedAt), { addSuffix: true })}
                      </p>
                      <p className="font-medium text-gold-300">Rewards: {nft.rewards.toFixed(2)} DIGR</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => handleUnstake(nft.id)}
                      disabled={unstaking[nft.id]}
                    >
                      {unstaking[nft.id] ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Unstaking...
                        </>
                      ) : (
                        "Unstake"
                      )}
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-3 w-3" />
                      <span className="sr-only">View on Explorer</span>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StakedNftsList
