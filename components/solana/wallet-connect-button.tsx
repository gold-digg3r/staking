"use client"

import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet, ChevronDown, Copy, ExternalLink, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface WalletConnectButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function WalletConnectButton({ variant = "outline", size = "default", className }: WalletConnectButtonProps) {
  const { publicKey, wallet, disconnect, connecting } = useWallet()
  const { setVisible } = useWalletModal()
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const openExplorer = () => {
    if (publicKey) {
      const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
      const explorerUrl = `https://explorer.solana.com/address/${publicKey.toString()}?cluster=${network}`
      window.open(explorerUrl, "_blank")
    }
  }

  if (!wallet) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn(
          "border-gold-300 text-gold-300 hover:bg-gold-300/10 dark:border-gold-300 dark:text-gold-300",
          className,
        )}
        onClick={() => setVisible(true)}
        disabled={connecting}
      >
        {connecting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            Connect Wallet
          </>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn(
            "border-gold-300 text-gold-300 hover:bg-gold-300/10 dark:border-gold-300 dark:text-gold-300",
            className,
          )}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : "Connected"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex flex-col space-y-1 p-2">
          <p className="text-xs font-medium text-muted-foreground">Connected with {wallet.adapter.name}</p>
          {publicKey && <p className="text-xs font-mono truncate">{publicKey.toString()}</p>}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopyAddress}>
          <Copy className="mr-2 h-4 w-4" />
          {copied ? "Copied!" : "Copy Address"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openExplorer}>
          <ExternalLink className="mr-2 h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()} className="text-red-500 focus:text-red-500">
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
