"use client"

import { useState } from "react"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { stakeNft } from "@/lib/solana/staking"

interface StakeNftDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  poolId: string
  poolName: string
}

export function StakeNftDialog({ open, onOpenChange, poolId, poolName }: StakeNftDialogProps) {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()
  const [selectedNft, setSelectedNft] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingNfts, setLoadingNfts] = useState(true)

  // Mock NFTs for demonstration
  const mockNfts = [
    {
      mint: "NFT1",
      name: "Gold Digger #1234",
      image: "/placeholder-ln8mu.png",
    },
    {
      mint: "NFT2",
      name: "Gold Digger #5678",
      image: "/placeholder-pkftx.png",
    },
  ]

  const handleStake = async () => {
    if (!publicKey || !selectedNft) return

    setLoading(true)
    try {
      // In a real implementation, this would call the actual staking function
      await stakeNft(publicKey.toString(), selectedNft.mint, poolId)

      toast({
        title: "NFT Staked",
        description: `Successfully staked ${selectedNft.name} in ${poolName}`,
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error staking NFT:", error)
      toast({
        title: "Staking Failed",
        description: "There was an error staking your NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stake NFT</DialogTitle>
          <DialogDescription>Select an NFT to stake in the {poolName} pool.</DialogDescription>
        </DialogHeader>

        {!publicKey ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-4">Please connect your wallet to stake NFTs.</p>
          </div>
        ) : loadingNfts ? (
          <div className="py-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gold-500" />
            <p className="text-muted-foreground">Loading your NFTs...</p>
          </div>
        ) : mockNfts.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground mb-2">No eligible NFTs found in your wallet.</p>
            <p className="text-sm">Purchase a Gold Digger NFT to start staking.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 py-4">
            {mockNfts.map((nft) => (
              <div
                key={nft.mint}
                className={`border rounded-lg p-2 cursor-pointer transition-all ${
                  selectedNft?.mint === nft.mint
                    ? "border-gold-500 bg-gold-500/10"
                    : "border-border hover:border-gold-500/50"
                }`}
                onClick={() => setSelectedNft(nft)}
              >
                <div className="relative aspect-square mb-2">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover rounded" />
                </div>
                <p className="text-sm font-medium truncate">{nft.name}</p>
              </div>
            ))}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStake}
            disabled={!publicKey || !selectedNft || loading}
            className="bg-gold-600 hover:bg-gold-700 text-black"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Staking...
              </>
            ) : (
              "Stake NFT"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
